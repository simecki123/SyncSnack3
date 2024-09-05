"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
  const t = useTranslations("Footer");

  const handleSignOut = async () => {
    console.log("signing out");
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <Button
      colorScheme="blue"
      variant="solid"
      _hover={{ bg: "red.500" }}
      onClick={handleSignOut}
    >
      {t("SignOutButton")}
    </Button>
  );
}
