"use client"

import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { removeBookFromChallenge } from "@/app/_actions"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { RemoveBookFromChallengeFormSchema } from "@/lib/validation"

interface Props {
  id: number
  title: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const RemoveBookFromChallengeForm = ({ id, title, setOpen }: Props) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof RemoveBookFromChallengeFormSchema>>({
    resolver: zodResolver(RemoveBookFromChallengeFormSchema),
    defaultValues: {
      id: id,
    },
  })

  const { execute, result, status } = useAction(removeBookFromChallenge, {
    onSuccess(data) {
      if (data?.error) {
        setOpen(false)
        toast({
          title: "Error!",
          description: `${data?.error}`,
        })
      }

      if (data?.success) {
        setOpen(false)
        toast({
          title: "Success!",
          description: `${data.success}`,
        })
        router.push("/library")
      }
    },
    onExecute(data) {
      console.log("deleting challenge...")
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

  const onSubmit = (
    values: z.infer<typeof RemoveBookFromChallengeFormSchema>
  ) => {
    execute(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button
            type="submit"
            disabled={status === "executing"}
            variant="destructive"
          >
            {status === "executing" ? (
              <span className="flex items-center gap-x-1.5">
                {`Removing...`}
                <ArrowPathIcon className="size-4 animate-spin" />
              </span>
            ) : (
              <span>{`Remove from Challenge`}</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
