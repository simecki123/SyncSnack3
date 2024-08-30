import ImageDarkMode from "@/app/components/login/ImageDarkMode";
import LoginForm from "@/app/components/login/LoginForm";
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
    >
      <Heading>SyncSnack</Heading>
      <ImageDarkMode />
      <Box
        className="shadow-lg p-6 rounded-md flex flex-col
        items-center mt-5"
      >
        <LoginForm />
        <Link textColor="xblue.500" className="mt-2">
          {t("Forgotpassword")}
        </Link>
        <Divider className="mt-2" />
        <Button className="mt-6" colorScheme="xorange">
          {t("CreateAccount")}
        </Button>
      </Box>
    </Box>
  );
}
