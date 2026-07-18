"use client";

import { useActionState } from "react";
import { Loader2, Send } from "lucide-react";
import { submitContactForm, type ContactState } from "@/actions/contact";
import { contactSubjects, type ContactSubject } from "@/config/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

const inputClasses =
  "w-full rounded-md border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-[#e2919e]">
      {message}
    </p>
  );
}

export function ContactForm({
  defaultSubject,
}: {
  defaultSubject?: ContactSubject;
}) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-primary/40 bg-primary/10 p-8 text-center"
      >
        <p className="font-display text-2xl">Message sent</p>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
            className={cn(inputClasses, state.errors?.name && "border-accent")}
          />
          <FieldError id="contact-name-error" message={state.errors?.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!state.errors?.email}
            aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
            className={cn(inputClasses, state.errors?.email && "border-accent")}
          />
          <FieldError id="contact-email-error" message={state.errors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue={defaultSubject ?? contactSubjects[0]}
          aria-invalid={!!state.errors?.subject}
          aria-describedby={state.errors?.subject ? "contact-subject-error" : undefined}
          className={cn(inputClasses, state.errors?.subject && "border-accent")}
        >
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError id="contact-subject-error" message={state.errors?.subject} />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "contact-message-error" : undefined}
          className={cn(inputClasses, "resize-y", state.errors?.message && "border-accent")}
        />
        <FieldError id="contact-message-error" message={state.errors?.message} />
      </div>

      {/* Honeypot: hidden from real users, catches naive bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader2 aria-hidden className="animate-spin" />
          ) : (
            <Send aria-hidden />
          )}
          Send message
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-[#e2919e]">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
