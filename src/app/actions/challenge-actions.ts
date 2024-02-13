"use server"

import { eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { cookies } from "next/headers"
import { createSafeActionClient } from "next-safe-action"
import * as z from "zod"

import { db } from "@/db"
import { challenges } from "@/db/schema"
import { createClient } from "@/lib/supabase/server"
import {
  ChallengeDataschema,
  DeleteChallengeFormSchema,
  EditChallengeFormSchema,
} from "@/lib/validation"

const action = createSafeActionClient()

// with unstable cache
export const getChallengeAction = unstable_cache(
  async (userId) => {
    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.user_id, userId),
      with: {
        books: {
          orderBy: (books, { desc }) => [desc(books.created_at)],
        },
      },
    })
    if (!challenge) return { error: "No challenge created yet." }
    if (challenge) return { success: challenge }
  },
  ["challenges", "books"],
  { tags: ["challenges", "books"] }
)

// with native useFormState
export const createChallenge = async (state: any, formData: FormData) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return { error: "Please sign in to create a challenge." }
  }

  const result = ChallengeDataschema.safeParse({
    books_in_challenge_count: formData.get("books_in_challenge_count"),
  })

  if (result.success) {
    const { books_in_challenge_count } = result.data

    const newChallenge = {
      user_id: data.user.id,
      books_in_challenge_count,
    }

    try {
      await db.insert(challenges).values(newChallenge)

      revalidateTag("challenges")
      return { data: result.data, status: "success", errors: {} }
    } catch (err) {
      const error = err as z.ZodError
      const errors = error.flatten().fieldErrors
      return {
        data: result.data,
        status: "errors",
        errors: {
          user_id: errors.user_id?.[0],
          books_in_challenge_count: errors.books_in_challenge_count?.[0],
        },
      }
    }
  }

  if (result.error) {
    return { error: result.error.format() }
  }
}

// with react-hook-form useForm and next-safe-action
export const editChallenge = action(
  EditChallengeFormSchema,
  async ({ books_in_challenge_count, books_in_library_count, id }) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { error: "Please sign in to edit a challenge." }
    }

    if (!books_in_challenge_count) {
      return { error: "Something went wrong, couldn't update the challenge." }
    }

    if (books_in_challenge_count < books_in_library_count) {
      return {
        error:
          "The number of books in your library can't exceed the number of books in your challenge.",
      }
    }

    const updatedChallenge = await db
      .update(challenges)
      .set({ books_in_challenge_count: books_in_challenge_count })
      .where(eq(challenges.id, id))
      .returning()

    revalidateTag("challenges")

    if (!updatedChallenge) return { error: "Could not update challenge" }
    if (updatedChallenge[0].id) return { success: "Challenge updated." }
  }
)

export const deleteChallenge = action(
  DeleteChallengeFormSchema,
  async ({ id }) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      return { error: "Please sign in to delete a challenge." }
    }

    if (!id) {
      return { error: "Something went wrong, couldn't delete the challenge." }
    }

    const deletedChallenge = await db
      .delete(challenges)
      .where(eq(challenges.id, id))

    revalidateTag("challenges")

    if (!deletedChallenge) return { error: "Could not delete challenge" }
    if (deletedChallenge) return { success: "Challenge deleted." }
  }
)
