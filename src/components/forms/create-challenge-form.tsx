"use client"

import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { useEffect, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { createChallenge } from "@/app/actions/challenge-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { cn, currentYear } from "@/lib/utils"

export const CreateChallengeForm = () => {
  const [state, formAction] = useFormState(createChallenge, null)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.data) {
      toast({
        title: "Success!",
        description: `You have created a ${state.data.books_in_challenge_count} book challenge.`,
      })
      formRef.current?.reset()
    }
  }, [toast, state])
  return (
    <div>
      <form
        ref={formRef}
        action={formAction}
        className="mt-5 w-full rounded-md border p-5 shadow"
      >
        <div className="flex items-center gap-x-2.5">
          <p>{`I want to read`}</p>
          <Input
            name="books_in_challenge_count"
            className="w-12"
            placeholder="0"
          />
          <p>{`books in ${currentYear}.`}</p>
        </div>
        {state?.error && (
          <p className="mt-1 text-xs text-red-500">
            {/* @ts-expect-error */}
            {state.error.books_in_challenge_count._errors[0]}
          </p>
        )}
        <SubmitButton />
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-2.5 w-full disabled:cursor-not-allowed"
    >
      {pending && <ArrowPathIcon className={cn("mr-2 size-4 animate-spin")} />}
      <span>{pending ? "Creating challenge..." : "Take the challenge"}</span>
    </Button>
  )
}
