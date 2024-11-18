import '@/app/globals.css'

import { languageTag } from '@saas/i18n/runtime'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { I18nProvider } from '@/providers/i18n-provider.server'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SaaS',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <I18nProvider>
      <html className={clsx(inter.className, 'dark')} lang={languageTag()}>
        <body>{children}</body>
      </html>
    </I18nProvider>
  )
}
