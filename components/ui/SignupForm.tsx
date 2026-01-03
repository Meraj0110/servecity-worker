"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useSignup } from "@/hooks/auth/useSignup";
import { useResendConfirmation } from "@/hooks/auth/useResendConfirmationMail";

interface SignupFormProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const SignupForm = ({
  heading = "Create your ServiceCity account",
  logo = {
    url: "/",
    src: "",
    alt: "logo",
    title: "ServiceCity",
  },
  googleText = "Continue with Google",
  signupText = "Create account",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: SignupFormProps) => {
  const signupMutation = useSignup();
  const resendMutation = useResendConfirmation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [countdown, setCountdown] = useState(100);
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPwd) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signupMutation.mutateAsync({ email, password });
      setSignupDone(true);
      setCountdown(100);
    } catch (err: any) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-background px-8 py-10 shadow-lg space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <a href={logo.url} className="text-2xl font-semibold tracking-tight">
            {logo.title}
          </a>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to manage services, orders, and your dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            required
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full h-11"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? "Creating account..." : signupText}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">
            OR
          </span>
        </div>

        {/* Google */}
        <Button variant="outline" className="w-full h-11" type="button">
          <FcGoogle className="mr-2 size-5" />
          {googleText}
        </Button>

        {/* Email verification */}
        {signupDone && (
          <div className="rounded-lg border bg-muted/40 p-4 text-center text-sm">
            <p className="text-muted-foreground mb-2">
              We’ve sent a confirmation email. Please verify your account.
            </p>

            <button
              type="button"
              disabled={countdown > 0}
              onClick={() =>
                resendMutation.mutate(email, {
                  onSuccess: () => setCountdown(100),
                })
              }
              className="underline disabled:opacity-50"
            >
              {countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend confirmation email"}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          {loginText}{" "}
          <a
            href={loginUrl}
            className="font-medium text-primary hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export { SignupForm };
