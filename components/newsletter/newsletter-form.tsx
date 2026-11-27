'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Loader2, Mail, PenLine, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { subscribeNewsletter } from '@/lib/newsletter';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setValidationError('');
    setStatus('loading');
    setMessage('');

    try {
      const data = await subscribeNewsletter({
        email: trimmed,
        title: title.trim() || undefined,
        message: note.trim() || undefined,
      });
      setStatus('success');
      setMessage(data.message || 'Thank you for subscribing!');
      setEmail('');
      setTitle('');
      setNote('');
      setShowDetails(false);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" aria-hidden />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationError) setValidationError('');
            }}
            disabled={status === 'loading'}
            aria-invalid={Boolean(validationError)}
            aria-describedby={validationError ? 'newsletter-error' : undefined}
            className={cn(
              'h-12 w-full rounded-full border bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/40 backdrop-blur transition-colors focus:outline-none focus:ring-2 disabled:opacity-60',
              validationError ? 'border-red-400/70 focus:ring-red-400/50' : 'border-white/20 focus:ring-brand-soft/60'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-soft px-6 text-sm font-semibold text-navy transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setShowDetails((s) => !s)}
        aria-expanded={showDetails}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
      >
        <PenLine className="size-3.5" aria-hidden />
        {showDetails ? 'Hide title & message' : 'Add a title & message (optional)'}
        <ChevronDown className={cn('size-3.5 transition-transform', showDetails && 'rotate-180')} aria-hidden />
      </button>

      <AnimatePresence initial={false}>
        {showDetails ? (
          <motion.div
            key="details"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="newsletter-title" className="mb-1.5 block text-xs font-medium text-white/60">
                  Title <span className="text-white/35">(optional)</span>
                </label>
                <input
                  id="newsletter-title"
                  type="text"
                  maxLength={120}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="e.g. Interested in GMP training"
                  className="h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/35 backdrop-blur transition-colors focus:outline-none focus:ring-2 focus:ring-brand-soft/60 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="newsletter-message" className="mb-1.5 block text-xs font-medium text-white/60">
                  Message <span className="text-white/35">(optional)</span>
                </label>
                <textarea
                  id="newsletter-message"
                  rows={2}
                  maxLength={1000}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Tell us what you'd like to hear about"
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/35 backdrop-blur transition-colors focus:outline-none focus:ring-2 focus:ring-brand-soft/60 disabled:opacity-60"
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {validationError ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">
          {validationError}
        </p>
      ) : null}

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.p
            key="success"
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-300"
          >
            <CheckCircle2 className="size-4" aria-hidden />
            {message}
          </motion.p>
        ) : null}
        {status === 'error' ? (
          <motion.p
            key="error"
            role="alert"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-red-300"
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <p className="mt-3 text-xs text-white/45">
        Stay informed. Keep learning. Keep growing. We respect your privacy — unsubscribe anytime.
      </p>
    </div>
  );
}
