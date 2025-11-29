import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Authlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full min-h-svh justify-center items-center relative">
      {/* back button */}
      <Button
        asChild
        className="absolute left-6 top-10 "
        size={"sm"}
        variant={"outline"}
      >
        <Link href={"/"}>
          <ArrowLeftCircle />
          <span className="hidden sm:block">Back</span>
        </Link>
      </Button>
      <div className="flex flex-col w-full max-w-sm gap-6">
        {/* logo */}
        <Link
          href={"/"}
          className="self-center flex gap-2 text-2xl items-center hover:text-muted-foreground"
        >
          <Image
            src={"/my-image.png"}
            alt="logo"
            width={60}
            height={60}
            className=" rounded-full"
          />
          Mo-LMS.
        </Link>
        {children}
      </div>
    </main>
  );
}
