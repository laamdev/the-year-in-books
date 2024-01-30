"use server"

import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { createSafeActionClient } from "next-safe-action"
import * as z from "zod"

import { db } from "@/db"
import { Book, books, challenges } from "@/db/schema"
import {
  BookDataSchema,
  ChallengeDataschema,
  DeleteChallengeFormSchema,
  EditChallengeFormSchema,
} from "@/lib/validation"

const action = createSafeActionClient()

// with unstable cache
export const getChallenge = unstable_cache(
  async () => {
    const { userId } = await auth()

    if (!userId) {
      return { error: "Please sign in to fetch your challenge." }
    }

    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.user_id, userId),
      with: {
        books: {
          orderBy: (books, { desc }) => [desc(books.created_at)],
        },
      },
    })
    if (!challenge?.id) return { error: "No challenge created yet." }
    if (challenge?.id) return { success: challenge }
  },
  ["challenges", "books"],
  { tags: ["challenges", "books"] }
)

// with native useFormState
export const createChallenge = async (state: any, formData: FormData) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to create a challenge." }
  }

  const result = ChallengeDataschema.safeParse({
    books_in_challenge_count: formData.get("books_in_challenge_count"),
  })

  if (result.success) {
    const { books_in_challenge_count } = result.data

    const newChallenge = {
      user_id: userId,
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

// // type EditChallenge = z.infer<typeof EditChallengeFormSchema>

// with react-hook-form useForm and next-safe-action
export const editChallenge = action(
  EditChallengeFormSchema,
  async ({ books_in_challenge_count, books_in_library_count, id }) => {
    const { userId } = await auth()

    if (!userId) {
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
    const { userId } = await auth()

    if (!userId) {
      return { error: "Please sign in to edit a challenge." }
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

export const getBook = unstable_cache(
  async (id: number) => {
    const { userId } = await auth()

    if (!userId) {
      return { error: "Please sign in to fetch your book." }
    }

    const book = await db.query.books.findFirst({
      where: eq(books.id, id),
    })

    if (!book?.id) return { error: "Couldn't retrieve this book." }
    if (book?.id) return { success: book }
  },
  ["books"],
  { tags: ["books"] }
)

// with bind
export const addBook = async (state: Book, formData: FormData | null) => {
  const { userId } = await auth()

  const result = BookDataSchema.safeParse({
    title: state.title,
    version: state.version,
    cover: state.cover,
    author: state.author,
    year: state.year,
    pages: state.pages ?? null,
    challenge_id: state.challenge_id,
    status: state.status,
  })

  if (!userId) {
    return { error: "Please sign in to create a challenge." }
  }

  if (result.success) {
    try {
      // @ts-expect-error
      await db.insert(books).values(result.data)

      revalidateTag("books")
      return { data: result.data }
    } catch (error) {
      console.error("Database Error:", error)

      return { error: `Failed to add book` }
    }
  }

  if (result.error) {
    return { error: result.error.format() }
  }
}

export const markAsRead = async (bookId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to mark book as read." }
  }

  await db.update(books).set({ status: "read" }).where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const markAsNowReading = async (bookId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to mark book as now reading." }
  }

  await db
    .update(books)
    .set({ status: "now_reading" })
    .where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const markAsWantToRead = async (bookId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to mark this book as want to read." }
  }

  await db
    .update(books)
    .set({ status: "want_to_read" })
    .where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const removeFromChallenge = async (bookId: number) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: "Please sign in to remove this book from your challenge." }
  }

  await db.delete(books).where(eq(books.id, bookId))

  revalidateTag("challenges")
}
