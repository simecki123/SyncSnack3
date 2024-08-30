import LoginForm from "@/app/components/login/LoginForm";
import PasswordInput from "@/app/components/login/PasswordInput";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

export default async function LoginPage() {
  return (
    <Box className="pt-4 flex flex-col items-center bg-gray-200 h-screen">
      <Heading>SyncSnack</Heading>
      <Image src="/SyncSnackLogo.png" />
      <Box
        className="bg-white shadow-lg p-6 rounded-md flex flex-col
        items-center mt-5"
      >
        <LoginForm />
        <Link textColor="xblue.500" className="mt-2">
          Forgot password?
        </Link>
        <Divider className="mt-2" />
        <Button className="mt-6" colorScheme="xorange">
          Create Account
        </Button>
      </Box>
    </Box>
  );
}
