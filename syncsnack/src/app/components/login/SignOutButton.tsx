"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    console.log("signing out");
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
