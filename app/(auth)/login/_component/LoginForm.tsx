"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auht-client";
import { GithubIcon, Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [pendingGitSign, startGitSign] = useTransition();
  async function GithubSignIn() {
    startGitSign(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onError: () => {
            toast.error("internal server error");
          },
          onSuccess: () => {
            toast.success("Welcome👋🎉");
          },
        },
      });
    });
  }
  // ==========email sign
  const [email, setemail] = useState("");
  const [pendingEmail, startEmail] = useTransition();
  const router = useRouter();
  async function sendOTP() {
    startEmail(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email, // required
        type: "sign-in", // required
        fetchOptions: {
          onError: () => {
            toast.error("internal server error");
          },
          onSuccess: () => {
            toast.success("email sent ");
            router.push(`/verify-request?email=${email}`);
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl"> Welcom Back ! </CardTitle>
        <CardDescription>Login With Github or Email Account </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Button
          onClick={GithubSignIn}
          disabled={pendingGitSign}
          className="w-full"
          variant={"outline"}
        >
          {pendingGitSign ? (
            <>
              <Loader className="size-4 animate-spin" /> loading...
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign With Github{" "}
            </>
          )}
        </Button>
        <div className="relative  flex items-center ">
          <Separator />
          <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 capitalize bg-card text-muted-foreground px-1">
            {" "}
            or continue with{" "}
          </span>
        </div>
        {/* form  */}
        <div className="grid gap-3">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder="x.yahoo@gmail.com"
            />
          </div>
          <Button
            onClick={sendOTP}
            disabled={pendingEmail}
            variant={"default"}
            className="capitalize"
          >
            {pendingEmail ? (
              <>
                <Loader className="size-4 animate-spin" /> loading...
              </>
            ) : (
              <>
                <Send className="size-4" /> continue with email
              </>
            )}{" "}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
