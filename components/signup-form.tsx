"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useSignup } from "@/hooks/auth/useSignup";
import { useResendConfirmation } from "@/hooks/auth/useResendConfirmationMail";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signupMutation = useSignup();
  const resendMutation = useResendConfirmation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [countdown, setCountdown] = useState(100);
  const [signupDone, setSignupDone] = useState(false);

  // countdown for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPwd) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signupMutation.mutateAsync({ email, password });

      setSignupDone(true);
      setCountdown(100);

      toast.success(`Confirmation link sent to ${email}`);
    } catch (err: any) {
      toast.error(err?.message || "Signup failed. Please try again.");
    }
  };

  const handleResend = () => {
    const id = toast.loading("Sending confirmation email...");

    resendMutation.mutate(email, {
      onSuccess: () => {
        setCountdown(100);
        toast.success(`Confirmation link sent to ${email}`, { id });
      },
      onError: (err: any) => {
        toast.error(
          err?.message || "Failed to resend confirmation email",
          { id }
        );
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email below to create your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email.
                </FieldDescription>
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      required
                    />
                  </Field>
                </Field>

                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending
                    ? "Creating account..."
                    : "Create account"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* SOCIAL BUTTONS (UI ONLY) */}
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <span className="sr-only">Sign up with Apple</span>
                  
                </Button>
                <Button variant="outline" type="button">
                  <span className="sr-only">Sign up with Google</span>
                  G
                </Button>
                <Button variant="outline" type="button">
                  <span className="sr-only">Sign up with Meta</span>
                  M
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>

              {/* RESEND CONFIRMATION */}
              {signupDone && (
                <div className="mt-4 rounded-md border bg-muted/40 p-3 text-center text-sm">
                  <p className="text-muted-foreground mb-2">
                    Please verify your email to continue.
                  </p>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={countdown > 0}
                    className="underline disabled:opacity-50"
                  >
                    {countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend confirmation email"}
                  </button>
                </div>
              )}
            </FieldGroup>
          </form>

          {/* IMAGE */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/vaga.jpg"
              alt="Signup"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
