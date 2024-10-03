"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  emailAddress: z.string().email({
    message: "email not valid. Please enter a valid email.",
  }),
  message: z.string().max(300, {
    message: "message is too long! (300 character max).",
  }),
})

const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6 shadow-dark-short border-2 border-[#f3fefb] bg-[#dee7e4] rounded-[2.5rem] px-14 py-10">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="who's calling?" {...field} />
              </FormControl>
              <FormDescription>
                This is who I will address you as.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="example987@gmail.com?" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your full email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message to me!</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field} />
              </FormControl>
              <FormDescription>
                Please enter your message here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-2">
        <Button type="submit" className="h-full px-8 shadow-button-short rounded-full bg-[#8DB9AA] hover:bg-[#587d71]">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
export default ContactForm;