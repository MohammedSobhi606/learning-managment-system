"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auht-client";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { toast } from "sonner";

export default function VerifyRequest() {
  const [value, setvalue] = useState("");
  const [OTP_verify, startTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const router = useRouter();
  function VerifyOTP() {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email, // required
        otp: value, // required
        fetchOptions: {
          onError: (e) => {
            toast.error(e.error.message + " or expired ");
          },
          onSuccess: () => {
            toast.success("email verified ");
            router.push(`/`);
          },
        },
      });
    });
  }
  return (
    <div>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            please check your email{" "}
          </CardTitle>
          <CardDescription className="text-center">
            ✔we have sent a verifecation code in your email{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 justify-center">
          {/* otp input  */}
          <div className="grid gap-4">
            <InputOTP
              value={value}
              maxLength={6}
              onChange={(value) => setvalue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <span className="text-xs text-muted-foreground text-center ">
              inter the 6 digit-code sent in your email
            </span>{" "}
          </div>
          <Button
            onClick={VerifyOTP}
            disabled={OTP_verify || value.length < 6}
            variant={"default"}
            className="capitalize"
          >
            {OTP_verify ? (
              <>
                <Loader className="size-4 animate-spin" /> loading...
              </>
            ) : (
              <>Verify email</>
            )}{" "}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
