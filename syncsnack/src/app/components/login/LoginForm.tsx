"use client";
import { Button, Input } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { useFormState } from "react-dom";
import { handleLogin } from "@/app/server-actions/login";

/**
 * Login form component for the login page.
 * Uses zod for validation.
 * @author Andrija
 */

const initialState: any = {
  message: null,
  errors: null,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(handleLogin, initialState);

  console.log(state);

  return (
    <form action={formAction}>
      <Input
        id="email"
        name="email"
        focusBorderColor="xblue.500"
        className="mb-2"
      />
      <PasswordInput />
      {state && state.message}
      <Button type="submit" className="w-full mt-4" colorScheme="xblue">
        Log in
      </Button>
    </form>
  );
}
