"use client";

import { Box, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { pathToFileURL } from "url";

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box className="absolute bottom-0 left-0 w-full">
      <Box className="flex p-2 justify-end space-x-2">
        <Button
          onClick={() =>
            router.push(`/hr${pathname.slice(3, pathname.length)}`)
          }
        >
          hr
        </Button>
        <Button
          onClick={() =>
            router.push(`/en${pathname.slice(3, pathname.length)}`)
          }
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
