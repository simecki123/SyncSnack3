"use client";

import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import SignOutButton from "../login/SignOutButton";

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  // check does pathname starts with /hr or /en
  // if not then add /hr to the pathname

  // if pathname is not /hr or /en
  // then to the pathname should append hr or en
  let appendUrl: boolean = false;
  if (pathname.slice(0, 3) !== "/hr" && pathname.slice(0, 3) !== "/en") {
    appendUrl = true;
  }

  return (
    <Box className="absolute bottom-0 left-0 w-full">
      <Box className="flex p-2 justify-end space-x-2">
        <SignOutButton />
        <Button
          onClick={() => {
            if (appendUrl) {
              router.push(`/hr${pathname}`);
            } else {
              router.push(`/hr${pathname.slice(3, pathname.length)}`);
            }
          }}
        >
          hr
        </Button>
        <Button
          onClick={() => {
            if (appendUrl) {
              router.push(`/en${pathname}`);
            } else {
              router.push(`/en${pathname.slice(3, pathname.length)}`);
            }
          }}
        >
          en
        </Button>
        <IconButton
          aria-label="Search database"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        />
      </Box>
    </Box>
  );
}
