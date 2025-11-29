"use client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import User_DropDown from "./User_DropDown";
import { authClient } from "@/lib/auht-client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur-md ">
      <div className="container min-h-16 mx-auto flex items-center px-4 md:px-6 lg:px-8  ">
        <Link href={"/"} className="flex gap-2 ">
          <Image
            src={"/my-image.png"}
            alt="logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-bold">Mo-LMS.</span>
        </Link>
        {/* desktop Navs */}
        <nav className="hidden md:flex md:items-center md:justify-between md:flex-1 border px-4 ml-2 py-1 bg-muted ">
          <div className="font-medium text-sm flex space-x-4 ">
            {navItems.map((item) => (
              <Link
                className="hover:text-muted-foreground transition-colors "
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* buttons */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isPending ? null : session ? (
              <User_DropDown user={session.user} />
            ) : (
              <>
                <Button asChild variant={"secondary"}>
                  <Link href={"/login"}>Login</Link>
                </Button>{" "}
                <Button asChild>
                  <Link href={"/login"}>Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
