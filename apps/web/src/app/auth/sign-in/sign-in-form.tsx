'use client'

import * as m from '@saas/i18n/messages'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [{ success, message, errors, formData }, formAction, isPending] =
    useActionState(signInWithEmailAndPassword, {
      success: false,
      message: null,
      errors: null,
      formData: null,
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.sign_in_with_email()}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {success === false && message && (
            <Alert className="m-0" variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>{m.sign_in_failed()}</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Label htmlFor="email">{m.email()}</Label>
            <Input
              defaultValue={formData?.get('email')?.toString()}
              id="email"
              name="email"
              type="email"
            />

            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">{m.password()}</Label>
            <Input id="password" name="password" type="password" />

            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password}
              </p>
            )}

            <Link
              className="text-xs font-medium text-foreground hover:underline"
              href="/auth/forgot-password"
            >
              {m.forgot_your_password()}
            </Link>
          </div>

          <Button className="w-full" disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-1 size-5 animate-spin" />}
            {m.sign_in_with_email()}
          </Button>

          <div className="flex w-full justify-center">
            <Button asChild size="sm" variant="link">
              <Link
                className={cn(isPending && 'pointer-events-none opacity-50')}
                href="/auth/sign-up"
              >
                {m.create_new_account()}
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
