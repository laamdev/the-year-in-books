"use client"

import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { deleteChallenge } from "@/app/actions/challenge-actions"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { DeleteChallengeFormSchema } from "@/lib/validation"

interface Props {
  challengeId: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DeleteChallengeForm = ({ setOpen, challengeId }: Props) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof DeleteChallengeFormSchema>>({
    resolver: zodResolver(DeleteChallengeFormSchema),
    defaultValues: {
      id: challengeId,
    },
  })

  const { execute, result, status } = useAction(deleteChallenge, {
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

  const onSubmit = (values: z.infer<typeof DeleteChallengeFormSchema>) => {
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
                {`Deleting...`}
                <ArrowPathIcon className="size-4 animate-spin" />
              </span>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
