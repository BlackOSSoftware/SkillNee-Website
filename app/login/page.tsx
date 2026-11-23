import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthShell } from '@/components/pages/auth-shell';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to SkillBee',
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Log in"
      description="Sign in to your SkillBee account."
      footer={
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:text-primary-hover">
            Create account
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        <Field id="login-email" label="Email" required>
          <Input id="login-email" name="email" type="email" placeholder="you@example.com" />
        </Field>
        <Field id="login-password" label="Password" required>
          <Input id="login-password" name="password" type="password" placeholder="Enter your password" />
        </Field>
        <Button type="button" className="w-full">
          Log in
        </Button>
      </div>
    </AuthShell>
  );
}
