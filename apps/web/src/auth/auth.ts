import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  const { get } = await cookies()

  return !!get('token')?.value
}

export async function auth() {
  const { get } = await cookies()
  const token = get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.log(err)
  }

  redirect('/api/auth/sign-out')
}
