"use client";

import { authClient } from "@/lib/auht-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function usesignOut() {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("signed out successfully");
          router.push("/");
        },
        onError: (ero) => {
          toast.error(ero.error.message);
        },
      },
    });
  };
  return handleSignOut;
}
