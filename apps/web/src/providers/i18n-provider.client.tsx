'use client'

import { AvailableLanguageTag, setLanguageTag } from '@saas/i18n/runtime'

interface ClientLanguageProviderProps {
  lang: AvailableLanguageTag
}

export function ClientLanguageProvider({ lang }: ClientLanguageProviderProps) {
  setLanguageTag(lang)

  return undefined
}
