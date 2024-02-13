"use server"

import { eq } from "drizzle-orm"
import { revalidateTag, unstable_cache } from "next/cache"
import { createSafeActionClient } from "next-safe-action"

import { db } from "@/db"
import { Book, books } from "@/db/schema"
import {
  BookDataSchema,
  RemoveBookFromChallengeFormSchema,
} from "@/lib/validation"

const action = createSafeActionClient()

// // type EditChallenge = z.infer<typeof EditChallengeFormSchema>

export const getBook = unstable_cache(
  async (id: number) => {
    // // const { userId } = await auth()

    // // if (!userId) {
    // //   return { error: "Please sign in to fetch your book." }
    // // }

    const book = await db.query.books.findFirst({
      where: eq(books.id, id),
    })

    if (!book?.id) return { error: "Couldn't retrieve this book." }
    if (book?.id) return { success: book }
  },
  ["challenges", "books"],
  { tags: ["challenges", "books"] }
)

// with bind
export const addBookToChallengeAction = async (
  state: Book,
  formData: FormData | null
) => {
  // // const { userId } = await auth()

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

  // // if (!userId) {
  // //   return { error: "Please sign in to create a challenge." }
  // // }

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

export const markBookAsReadAction = async (bookId: number) => {
  // // const { userId } = await auth()

  // // if (!userId) {
  // //   return { error: "Please sign in to mark book as read." }
  // // }

  await db
    .update(books)
    .set({ status: "read", read_at: new Date() })
    .where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const markBookAsNowReadingAction = async (bookId: number) => {
  // // const { userId } = await auth()

  // // if (!userId) {
  // //   return { error: "Please sign in to mark book as now reading." }
  // // }

  await db
    .update(books)
    .set({ status: "now_reading", read_at: null, started_at: new Date() })
    .where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const markBookAsWantToReadAction = async (bookId: number) => {
  await db
    .update(books)
    .set({ status: "want_to_read", read_at: null, started_at: null })
    .where(eq(books.id, bookId))

  revalidateTag("challenges")
}

export const removeBookFromChallenge = action(
  RemoveBookFromChallengeFormSchema,
  async ({ id }) => {
    // // const { userId } = await auth()

    // // if (!userId) {
    // //   return { error: "Please sign in to remove book from challenge." }
    // // }

    // // if (!id) {
    // //   return {
    // //     error: "Something went wrong, couldn't remove book from challenge.",
    // //   }
    // // }

    const bookRemovedFromChallenge = await db
      .delete(books)
      .where(eq(books.id, id))

    revalidateTag("challenges")

    if (!bookRemovedFromChallenge)
      return { error: "Could not remove book from challenge" }

    if (bookRemovedFromChallenge)
      return { success: "Book removed from challenge" }
  }
)

export const giveRating = async (bookId: number, rating: number) => {
  await db.update(books).set({ rating: rating }).where(eq(books.id, bookId))

  revalidateTag("books")
}
