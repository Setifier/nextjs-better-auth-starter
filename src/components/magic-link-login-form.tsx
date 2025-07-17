"use client";

import { StarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MagicLinkLoginForm() {
  const [isPending, setIsPending] = useState(false);

  const ref = useRef<HTMLDetailsElement>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));
    if (!email) return toast.error("Email is required");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Magic link sent to email. Please check your inbox.");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  }

  return (
    <div>
      <details
        ref={ref}
        className="max-w-sm rounded-md border border-purple-500 overflow-hidden"
      >
        <summary className="flex gap-2 items-center px-2 py-1 bg-purple-500 text-white hover:bg-purple-600/80 transition cursor-pointer">
          Magic Link Login
          <StarIcon size={16} />
        </summary>

        <form onSubmit={handleSubmit} className="px-2 py-1">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <div className="flex gap-2 items-center">
            <Input type="email" id="email" name="email" placeholder="Email" />
            <Button type="submit" disabled={isPending}>
              Send
            </Button>
          </div>
        </form>
      </details>
    </div>
  );
}
