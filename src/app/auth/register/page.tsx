import { RegisterForm } from "@/components/register-form";
import { ReturnButton } from "@/components/return-button";
import { SignInOAuthButtons } from "@/components/sign-in-oauth-buttons";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Create an account</h1>
      </div>
      <div className="space-y-4">
        <RegisterForm />

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="hover:text-foreground">
            Login
          </Link>
        </p>

        <hr className="max-w-sm" />
      </div>

      <div className="flex flex-col max-w-sm gap-4">
        <SignInOAuthButtons signUp provider="google" />
        <SignInOAuthButtons signUp provider="github" />
      </div>
    </div>
  );
}
