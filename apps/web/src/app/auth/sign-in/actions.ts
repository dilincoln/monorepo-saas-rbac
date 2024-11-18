'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { HTTPError } from '@/http/api-client'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export async function signInWithEmailAndPassword(
  _previousState: unknown,
  formData: FormData,
) {
  const result = signInSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors, formData }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email: String(email),
      password: String(password),
    })

    const { set } = await cookies()

    set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = err

      return { success: false, message, errors: null, formData }
    }
  }

  redirect('/')

  return { success: true, message: null, errors: null, formData: null }
}
