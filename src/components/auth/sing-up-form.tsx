"use client"

import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signUpAction } from "@/app/actions/auth-actions"
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
import { toast } from "@/components/ui/use-toast"
import { SignUpFormSchema } from "@/lib/validation"

export const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  })

  const { execute, result, status } = useAction(signUpAction, {
    onSuccess(data) {
      if (data?.error) console.log(data.error)
      toast({
        title: "Error!",
        description: `${data?.error}`,
      })

      if (data?.success) {
        router.push("/sign-in")

        toast({
          title: "Success!",
          description: `${data.success}`,
        })
      }
    },
    onExecute(data) {
      console.log("editing challenge...")
    },
    onError(error) {
      if (error.serverError) {
        return
      }
      if (error.validationErrors) {
        return
      }
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    execute(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={status === "executing"}
          className="w-full"
        >
          {status === "executing" ? (
            <div className="flex items-center">
              <ArrowPathIcon className="size-4 animate-spin" />
              <span>{`Signing up...`}</span>
            </div>
          ) : (
            <span>{`Sign up`}</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
