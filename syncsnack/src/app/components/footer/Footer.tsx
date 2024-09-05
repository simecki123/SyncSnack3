import { auth } from "@/commons/auth";
import ExpendableFooter from "./ExpendableFooter";

export default async function Footer() {
  let isSignOutButtonVisible = false;
  const session = await auth();
  const activeUser: any = session?.user;
  if (!!activeUser) {
    isSignOutButtonVisible = true;
  }

  return (
    <ExpendableFooter isSignOutButtonVisible={isSignOutButtonVisible}></ExpendableFooter>
  );
}
