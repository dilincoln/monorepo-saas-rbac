import {
  isAvailableLanguageTag,
  setLanguageTag,
  sourceLanguageTag,
} from '@saas/i18n/runtime'
import { cookies } from 'next/headers'
import React from 'react'

import { I18N_COOKIE_NAME } from '@/constants/i18n-cookie-name'

import { ClientLanguageProvider } from './i18n-provider.client'

export async function I18nProvider({ children }: React.PropsWithChildren) {
  const nextCookies = await cookies()

  const lang = nextCookies.get(I18N_COOKIE_NAME)?.value

  const validLang = isAvailableLanguageTag(lang) ? lang : sourceLanguageTag

  setLanguageTag(validLang)

  return (
    <>
      <ClientLanguageProvider lang={validLang} />
      <React.Fragment key={validLang}>{children}</React.Fragment>
    </>
  )
}
