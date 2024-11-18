import { languageTag } from '@saas/i18n/runtime'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { LanguageSwitcher } from '@/components/language-switcher'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mt-auto w-full max-w-xs">{children}</div>
      <div className="mb-2 mt-auto self-end">
        <LanguageSwitcher currentLanguage={languageTag()} />
      </div>
    </div>
  )
}
