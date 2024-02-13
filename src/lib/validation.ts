import { z } from "zod"

export const ChallengeDataschema = z.object({
  books_in_challenge_count: z.coerce
    .number({ invalid_type_error: "You must enter a number" })
    .min(1, "At least one book is required.")
    .max(100, "You can only max 100 books to your challenge."),
})

export const BookDataSchema = z.object({
  title: z.coerce.string().min(1, "The book title must have at least 1 char."),
  author: z.coerce.string().min(1, "The book title must have at least 1 char."),
  year: z.coerce.number({ invalid_type_error: "You must enter a number" }),
  pages: z.coerce.number({ invalid_type_error: "You must enter a number" }),
  cover: z.coerce.string(),
  version: z.coerce.number(),
  status: z.coerce.string(),
  challenge_id: z.coerce.number({
    invalid_type_error: "You must enter a number",
  }),
})

export const EditChallengeFormSchema = z.object({
  id: z.coerce.number(),
  books_in_challenge_count: z.coerce
    .number()
    .min(1, "At least one book is required.")
    .max(100, "You can only max 100 books to your challenge."),
  books_in_library_count: z.coerce
    .number()
    .min(1, "At least one book is required.")
    .max(100, "You can only max 100 books to your challenge."),
})

export const DeleteChallengeFormSchema = z.object({
  id: z.coerce.number(),
})

export const RemoveBookFromChallengeFormSchema = z.object({
  id: z.coerce.number(),
})

export const SignUpFormSchema = z
  .object({
    email: z.coerce.string().email(),
    password: z.coerce.string().min(3, {
      message: "Password is required.",
    }),
    confirm: z.coerce.string().min(3, {
      message: "Password is required.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  })

export const SignInFormSchema = z.object({
  email: z.coerce.string().email(),
  password: z.coerce.string().min(3, {
    message: "Password is required.",
  }),
})
