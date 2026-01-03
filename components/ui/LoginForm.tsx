"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useLogin } from "@/hooks/auth/useLogin";

interface LoginFormProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const LoginForm = ({
  heading = "ServiceCity Dashboard Login",
  logo = {
    url: "/",
    src: "",
    alt: "logo",
    title: "ServiceCity",
  },
  buttonText = "Login to Dashboard",
  googleText = "Continue with Google",
  signupText = "New here?",
  signupUrl = "/signup",
}: LoginFormProps) => {
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      window.location.href = "/";
    } catch (err: any) {
      alert(err?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-background shadow-lg px-8 py-10 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <a
              href={logo.url}
              className="text-2xl font-semibold tracking-tight"
            >
              {logo.title}
            </a>
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-3">
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
            </div>

            <Button
              type="submit"
              className="w-full h-11"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : buttonText}
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

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            {signupText}{" "}
            <a
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LoginForm };
