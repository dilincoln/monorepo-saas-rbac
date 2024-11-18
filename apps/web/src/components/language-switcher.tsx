'use client'

import {
  type AvailableLanguageTag,
  availableLanguageTags,
} from '@saas/i18n/runtime'
import { setCookie } from 'cookies-next'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { I18N_COOKIE_NAME } from '@/constants/i18n-cookie-name'
import { revalidateI18n } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLanguage: AvailableLanguageTag
}

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  return (
    <ToggleGroup size="sm" type="single">
      {availableLanguageTags.map((lng) => (
        <form key={lng}>
          <ToggleGroupItem
            aria-label={lng}
            data-state={lng === currentLanguage ? 'on' : 'off'}
            onClick={async () => {
              setCookie(I18N_COOKIE_NAME, lng, {
                maxAge: 60 * 60 * 24 * 364, // 1 year
              })

              await revalidateI18n()
            }}
            type="submit"
            value={lng}
          >
            <span className="font-light text-primary opacity-60">{lng}</span>
          </ToggleGroupItem>
        </form>
      ))}
    </ToggleGroup>
  )
}
