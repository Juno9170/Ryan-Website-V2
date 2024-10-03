"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      message: "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { errors, isSubmitting } = formState;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className=" w-full lg:w-1/2 space-y-6 bg-gradient-to-tr from-transparent to-transparent via-white">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6 shadow-dark-short border-2 border-[#f3fefb] bg-[#a1c2af70] rounded-[2.5rem] px-14 py-10"
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
                    placeholder="who's calling?"
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
                    placeholder="example987@gmail.com?"
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
          <div className="flex justify-center py-2">
            <Button
              type="submit"
              className={`h-full px-8 shadow-button-short rounded-full bg-[#8DB9AA] hover:bg-[#587d71] ${isSubmitting || Object.keys(errors).length > 0 ? " cursor-not-allowed" : " cursor-pointer"}`}
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
