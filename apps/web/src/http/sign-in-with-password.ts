import {
  PostSessionsPassword201,
  PostSessionsPasswordBody,
} from '@saas/api-types'

import { api } from '@/http/api-client'

type SignInWithPasswordRequest = PostSessionsPasswordBody

type SignInWithPasswordResponse = PostSessionsPassword201

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest): Promise<SignInWithPasswordResponse> {
  const result = await api.post<
    SignInWithPasswordRequest,
    SignInWithPasswordResponse
  >('/sessions/password', {
    email,
    password,
  })

  return result
}
