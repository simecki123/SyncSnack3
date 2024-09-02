"use client";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function SwitchColorThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Search database"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    />
  );
}
