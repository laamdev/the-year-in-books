"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createSafeActionClient } from "next-safe-action"

import { createClient } from "@/lib/supabase/server"
import { SignInFormSchema, SignUpFormSchema } from "@/lib/validation"

const action = createSafeActionClient()

export async function signInAction(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export const signUpAction = action(
  SignUpFormSchema,
  async ({ email, password, confirm }) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!email || !password) {
      return { error: "Something went wrong, couldn't sign up." }
    }

    const { error } = await supabase.auth.signUp({ email, password })

    revalidatePath("/", "layout")

    if (error) {
      return { error: "Something went wrong, couldn't sign up." }
    } else {
      return { success: "User registered." }
    }
  }
)

export const signOutAction = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await supabase.auth.signOut()
  redirect("/")
}
