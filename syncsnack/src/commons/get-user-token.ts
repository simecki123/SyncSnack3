"use server";
import { auth } from "./auth";

export async function getUserToken() {
  const session = await auth();
  const activeUser: any = session?.user;

  return activeUser.accessToken;
}
