"use server";
import { signIn } from "@/commons/auth";
import { redirect } from "next/navigation";
import z from "zod";

export async function handleLogin(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid credentials",
    };
  }
  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (e: any) {
    return {
      message: "Wrong credentials",
    };
  }
  redirect("/home");
}
