import ImageDarkMode from "@/app/components/login/ImageDarkMode";
import LoginForm from "@/app/components/login/LoginForm";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("LoginPage");

  return (
    <Box
      className="pt-4 flex flex-col items-center
      h-screen"
      borderWidth="1px"
    >
      <Heading>SyncSnack</Heading>
      <ImageDarkMode />
      <Box
        className="shadow-lg p-6 rounded-md flex flex-col
        items-center mt-5"
        borderWidth="1px"
      >
        <LoginForm />
        <Link
          href="/set-profile"
          as={NextLink}
          colorScheme="xblue"
          className="mt-2"
        >
          {t("Forgotpassword")}
        </Link>
        <Divider className="mt-2" />
        <Link href="/register" as={NextLink}>
          <Button className="mt-6" colorScheme="xorange">
            {t("CreateAccount")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
