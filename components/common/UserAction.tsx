"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function UserAction({
  session,
  type,
}: {
  session: any;
  type: "Employee" | "Admin";
}) {
  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9 sm:flex">
                <AvatarFallback>
                  {session?.user?.name.charAt(0) +
                    "" +
                    session?.user?.name.split(" ")[1].charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={
                  type === "Employee" ? "/employee/profile" : "/admin/profile"
                }
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={() => signOut()}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="ml-auto">
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      )}
    </>
  );
}
