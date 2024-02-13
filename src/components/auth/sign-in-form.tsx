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

export const SignInForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
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

        <Button
          type="submit"
          disabled={status === "executing"}
          className="flex w-full gap-2"
        >
          {status === "executing" ? (
            <span className="flex items-center gap-x-1.5">
              {`Signing in...`}
              <ArrowPathIcon className="size-4 animate-spin" />
            </span>
          ) : (
            <span>{`Sign in`}</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
// // import { signInAction, signUpAction } from "@/app/actions/auth-actions"

// // export const SignInForm = () => {
// //   return (
// //     <form>
// //       <label htmlFor="email">Email:</label>
// //       <input id="email" name="email" type="email" required />
// //       <label htmlFor="password">Password:</label>
// //       <input id="password" name="password" type="password" required />
// //       <button formAction={signInAction}>Log in</button>
// //       <button formAction={signUpAction}>Sign up</button>
// //     </form>
// //   )
// // }
