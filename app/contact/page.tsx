import type { Metadata } from 'next';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, Input, Select, Textarea } from '@/components/ui/input';
import { IconTile, type IconTone } from '@/components/ui/icon-tile';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact the SkillBee team',
};

const contactPoints: Array<{ title: string; description: string; icon: LucideIcon; tone: IconTone }> = [
  { title: 'Email', description: 'Email placeholder for the contact page.', icon: Mail, tone: 'sky' },
  { title: 'Location', description: 'Location placeholder for the contact page.', icon: MapPin, tone: 'violet' },
  { title: 'Support', description: 'Support placeholder for the contact page.', icon: MessageSquare, tone: 'teal' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Placeholder contact page layout for the SkillBee public website."
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            {contactPoints.map((point) => (
              <Card key={point.title} className="flex items-start gap-4 p-5">
                <IconTile icon={point.icon} tone={point.tone} size="md" />
                <div>
                  <h2 className="text-base font-semibold text-ink">{point.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{point.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink">Send a message</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Form integration will be added in a later phase.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field id="contact-name" label="Name" required>
                <Input id="contact-name" name="name" placeholder="Your name" />
              </Field>
              <Field id="contact-email" label="Email" required>
                <Input id="contact-email" name="email" type="email" placeholder="you@example.com" />
              </Field>
              <div className="sm:col-span-2">
                <Field id="contact-subject" label="Subject" required>
                  <Select id="contact-subject" name="subject" defaultValue="general">
                    <option value="general">General inquiry</option>
                    <option value="courses">Courses</option>
                    <option value="support">Support</option>
                  </Select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="contact-message" label="Message" required>
                  <Textarea id="contact-message" name="message" placeholder="Write your message" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Button type="button" size="md" className="w-full sm:w-auto">
                  Send message
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
