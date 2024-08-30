"use client";
import { Button, useColorMode } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function Counter() {
  const t = useTranslations("HomePage");
  const [number, setNumber] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  function handleClick() {
    setNumber((prew) => prew + 1);
  }

  return (
    <div>
      <h1>
        {t("number")} {number}
      </h1>
      <Button colorScheme="xblue" onClick={handleClick}>
        Click
      </Button>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
}
