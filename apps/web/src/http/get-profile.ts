import { GetProfile200 } from '@saas/api-types'

import { api } from '@/http/api-client'

type GetProfileResponse = GetProfile200

export async function getProfile() {
  const result = await api.get<GetProfileResponse>('profile')

  return result
}
