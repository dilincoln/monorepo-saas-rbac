import * as m from '@saas/i18n/messages'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.create_new_account()}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action="" className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">{m.name()}</Label>
            <Input id="name" name="name" type="name" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">{m.email()}</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">{m.password()}</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">
              {m.confirm_your_password()}
            </Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
            />
          </div>

          <Button className="w-full" type="submit">
            {m.create_account()}
          </Button>

          <div className="flex w-full justify-center">
            <Button asChild size="sm" variant="link">
              <Link href="/auth/sign-in">{m.already_registered_sign_in()}</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
