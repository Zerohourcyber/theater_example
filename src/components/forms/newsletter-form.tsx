"use client";

import { useActionState } from "react";
import { Loader2, Mail } from "lucide-react";
import {
  subscribeToNewsletter,
  type NewsletterState,
} from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );

  return (
    <form action={formAction} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 flex-1 rounded-md border border-border bg-background px-4 text-base text-foreground placeholder:text-muted"
        />
        {/* Honeypot: hidden from real users, catches naive bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader2 aria-hidden className="animate-spin" />
          ) : (
            <Mail aria-hidden />
          )}
          Sign up
        </Button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-6 text-sm",
          state.status === "success" && "text-primary",
          state.status === "error" && "text-[#e2919e]"
        )}
      >
        {state.message}
      </p>
    </form>
  );
}
