import { Box } from "@chakra-ui/react";
import SignOutButton from "./SignOutButton";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";
import { auth } from "@/commons/auth";

export default async function Footer() {
  let isSignOutButtonVisible = false;
  const session = await auth();
  const activeUser: any = session?.user;
  if (!!activeUser) {
    isSignOutButtonVisible = true;
  }

  return (
    <Box className="absolute bottom-0 left-0 w-full">
      <Box className="flex p-2 justify-end space-x-2">
        {isSignOutButtonVisible && <SignOutButton />}
        <FooterLanguageButtons />
        <SwitchColorThemeButton />
      </Box>
    </Box>
  );
}
