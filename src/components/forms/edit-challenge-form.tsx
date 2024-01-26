"use client"

import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { editChallenge } from "@/app/_actions"
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
import { useToast } from "@/components/ui/use-toast"
import { EditChallengeFormSchema } from "@/lib/validation"

interface Props {
  challengeId: number
  booksInChallengeCount: number
  booksInLibraryCount: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const EditChallengeForm = ({
  setOpen,
  challengeId,
  booksInChallengeCount,
  booksInLibraryCount,
}: Props) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof EditChallengeFormSchema>>({
    resolver: zodResolver(EditChallengeFormSchema),
    defaultValues: {
      id: challengeId,
      books_in_challenge_count: booksInChallengeCount,
      books_in_library_count: booksInLibraryCount,
    },
  })

  const { execute, result, status } = useAction(editChallenge, {
    onSuccess(data) {
      if (data?.error) console.log(data.error)
      setOpen(false)
      toast({
        title: "Error!",
        description: `${data?.error}`,
      })

      if (data?.success) {
        setOpen(false)
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

  const onSubmit = (values: z.infer<typeof EditChallengeFormSchema>) => {
    execute(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="books_in_challenge_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`How many books you want to read this?`}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="books..." {...field} />
                </FormControl>
                {/* <FormDescription>Edit your challenge</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={status === "executing"}
            className="mt-5"
          >
            {status === "executing" ? (
              <span className="flex items-center gap-x-1.5">
                {`Editing...`}
                <ArrowPathIcon className="size-4 animate-spin" />
              </span>
            ) : (
              <span>Edit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
