"use client";
import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // Import useGoogleReCaptcha

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  emailAddress: z.string().email({
    message: "Email not valid. Please enter a valid email.",
  }),
  message: z.string().max(350, {
    message: "Message is too long! (350 character max).",
  }),
});

const ContactForm = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha(); // Initialize reCAPTCHA
  const recaptchaRef = useRef(null); // Reference to the reCAPTCHA component
  const [showChallenge, setShowChallenge] = useState(false); // State to track whether reCAPTCHA is verified
  const [formData, setFormData] = useState<z.infer<typeof FormSchema> | null>(
    null,
  ); // State to store form data when v2 is triggered

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      message: "",
    },
  });

  const { handleSubmit, control, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!executeRecaptcha) {
      console.error("Recaptcha not yet loaded");
      return;
    }

    try {
      const token = await executeRecaptcha("submit"); // Get the reCAPTCHA token

      const functionURL = "/.netlify/functions/recaptchaVerifier";

      const response = await fetch(functionURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, version: "v3" }), // Send the form data and token as JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${response.status} ${errorMessage}`);
      }

      const result = await response.json();

      if (result.score <= 0.5) {
        setShowChallenge(true);
        setFormData(data); // Store form data to pass after v2 reCAPTCHA completion
      } else {
        onSuccess(data);
        reset();
      }
    } catch (error) {
      console.error("Error submitting data to function:", error);
    }
  };

  const onRecaptchaChange = async (v2Token: string | null) => {
    if (v2Token && formData) {
      try {
        const functionURL = "/.netlify/functions/recaptchaVerifier";
        const response = await fetch(functionURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: v2Token, version: "v2" }), // Send the v2 token to server
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error: ${response.status} ${errorMessage}`);
        }

        const result = await response.json();

        if (result.success) {
          // Handle success by passing the form data to onSuccess
          onSuccess(formData);
          reset();
          setShowChallenge(false);
          setFormData(null); // Clear form data state after success
        } else {
          console.error("v2 reCAPTCHA challenge failed. Try again.");
        }
      } catch (error) {
        console.error("Error validating v2 reCAPTCHA:", error);
      }
    }
  };

  const onSuccess = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/.netlify/functions/googleSheetsHandler", {
      // Adjust the URL based on your hosting
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const date: Date = new Date();

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const formattedDate: string = date.toLocaleString("en-US", options);

      toast({
        className: "border-[#d6e4dc] border-2",
        title: "Form Submission: Success!",
        description: formattedDate ? formattedDate : "Today",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Form Submission: Failed!",
        description: "Please try again later or check your email domain",
      });
    }
  };

  return (
    <div className="w-full lg:w-1/2 space-y-3 md:space-y-6 bg-gradient-to-tr from-transparent to-transparent via-white">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-3 md:space-y-6 shadow-dark-short border-2 border-[#f3fefb] bg-[#a1c2af70] rounded-[2.5rem] px-7 py-5 md:px-10 md:py-8 lg:px-14 lg:py-10"
        >
          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="xxl:text-xl xl:text-lg text-base">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: John Pork"
                    {...field}
                    className="xxl:text-xl xl:text-lg text-base"
                  />
                </FormControl>
                <FormDescription>
                  This is who I will address you as.
                </FormDescription>
                <FormMessage>
                  {errors.fullName && <span>{errors.fullName.message}</span>}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="xxl:text-xl xl:text-lg text-base">
                  Your Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example987@gmail.com"
                    {...field}
                    className="xxl:text-xl xl:text-lg text-base "
                  />
                </FormControl>
                <FormDescription>
                  Please enter your full email address.
                </FormDescription>
                <FormMessage>
                  {errors.emailAddress && (
                    <span>{errors.emailAddress.message}</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="xxl:text-xl xl:text-lg text-base">
                  Message to me!
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none xxl:text-xl xl:text-lg text-base xxl:h-60"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter your message here.
                </FormDescription>
                <FormMessage>
                  {errors.message && <span>{errors.message.message}</span>}
                </FormMessage>
              </FormItem>
            )}
          />
          {showChallenge && (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.PUBLIC_REACT_CHALLENGE_KEY} // Replace with your site key
              onChange={onRecaptchaChange} // Handle reCAPTCHA state when the checkbox is checked/unchecked
            />
          )}

          <div className="flex justify-center py-2">
            <Button
              type="submit"
              disabled={showChallenge}
              className={`cursor-pointer ${
                showChallenge ? "cursor-not-allowed" : ""
              } h-full px-8 shadow-button-short rounded-full bg-[#8DB9AA] hover:bg-[#587d71] ${
                isSubmitting || Object.keys(errors).length > 0
                  ? " cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Sending!..." : "Submit"}
              <Send strokeWidth={2} className=" xxxl:h-6 xl:h-4 lg:h-3" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
