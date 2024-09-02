import { Box } from "@chakra-ui/react";
import SignOutButton from "./SignOutButton";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";

export default function Footer() {
  return (
    <Box className="absolute bottom-0 left-0 w-full">
      <Box className="flex p-2 justify-end space-x-2">
        <SignOutButton />
        <FooterLanguageButtons />
        <SwitchColorThemeButton />
      </Box>
    </Box>
  );
}
