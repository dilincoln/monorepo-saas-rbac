import { redirect } from 'next/navigation'

import { auth, isAuthenticated } from '@/auth/auth'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }

  const [{ user }] = await Promise.all([auth()])

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="p-2">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
