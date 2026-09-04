"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactState } from "@/actions/contact";
import {
  contactSubjects,
  defaultSubject,
  type ContactSubject,
} from "@/config/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

const field =
  "w-full border border-rule bg-paper-2/40 px-4 py-2.5 text-base text-ink placeholder:text-ink-dim focus:border-wheat";

const labelClass = "mb-1.5 block text-[0.875rem] text-ink-dim";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[0.875rem] text-stop">
      {message}
    </p>
  );
}

export function ContactForm({
  initialSubject,
}: {
  initialSubject?: ContactSubject;
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
        className="border-l-2 border-go bg-paper-2/50 p-8"
      >
        <p className="m-0 text-[1.375rem]">Message sent</p>
        <p className="m-0 mt-2 text-ink-dim">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            suppressHydrationWarning
            aria-invalid={!!state.errors?.name}
            aria-describedby={
              state.errors?.name ? "contact-name-error" : undefined
            }
            className={cn(field, state.errors?.name && "border-stop")}
          />
          <FieldError id="contact-name-error" message={state.errors?.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            suppressHydrationWarning
            aria-invalid={!!state.errors?.email}
            aria-describedby={
              state.errors?.email ? "contact-email-error" : undefined
            }
            className={cn(field, state.errors?.email && "border-stop")}
          />
          <FieldError id="contact-email-error" message={state.errors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          What&rsquo;s this about?
        </label>
        <select
          id="contact-subject"
          name="subject"
          defaultValue={initialSubject ?? defaultSubject}
          suppressHydrationWarning
          aria-invalid={!!state.errors?.subject}
          aria-describedby={
            state.errors?.subject ? "contact-subject-error" : undefined
          }
          className={cn(field, state.errors?.subject && "border-stop")}
        >
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError
          id="contact-subject-error"
          message={state.errors?.subject}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          suppressHydrationWarning
          aria-invalid={!!state.errors?.message}
          aria-describedby={
            state.errors?.message ? "contact-message-error" : undefined
          }
          className={cn(
            field,
            "resize-y",
            state.errors?.message && "border-stop"
          )}
        />
        <FieldError
          id="contact-message-error"
          message={state.errors?.message}
        />
      </div>

      {/* Honeypot: hidden from real users, catches naive bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" disabled={pending} suppressHydrationWarning>
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p role="status" aria-live="polite" className="m-0 text-[0.9375rem] text-stop">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
