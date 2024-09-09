"use client";
import { theme } from "@/commons/chakra-theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const GroupEventsContext = createContext({
  groupEvents: [],
  setGroupEvents: (value: any) => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [groupEvents, setGroupEvents] = useState([]);

  return (
    <GroupEventsContext.Provider value={{ groupEvents, setGroupEvents }}>
      <SessionProvider>
        <ColorModeScript initialColorMode={"light"} />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </SessionProvider>
    </GroupEventsContext.Provider>
  );
}
