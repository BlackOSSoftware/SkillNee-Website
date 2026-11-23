import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthShell } from '@/components/pages/auth-shell';
import { Button } from '@/components/ui/button';
import { Field, Input, Select } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a SkillBee account',
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create account"
      description="Register for a SkillBee account."
      footer={
        <p>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
            Log in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        <Field id="register-name" label="Full name" required>
          <Input id="register-name" name="name" placeholder="Your full name" />
        </Field>
        <Field id="register-email" label="Email" required>
          <Input id="register-email" name="email" type="email" placeholder="you@example.com" />
        </Field>
        <Field id="register-role" label="I am a" required>
          <Select id="register-role" name="role" defaultValue="student">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </Select>
        </Field>
        <Field id="register-password" label="Password" required>
          <Input id="register-password" name="password" type="password" placeholder="Create a password" />
        </Field>
        <Field id="register-confirm" label="Confirm password" required>
          <Input id="register-confirm" name="confirmPassword" type="password" placeholder="Confirm your password" />
        </Field>
        <Button type="button" className="w-full">
          Create account
        </Button>
      </div>
    </AuthShell>
  );
}
