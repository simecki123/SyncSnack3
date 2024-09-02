import SidebarGroups from "@/app/components/sidebar/SidebarGroups";
import { Box, Image, Text } from "@chakra-ui/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="flex h-screen items-stretch">
      <Box>
        <SidebarGroups />
      </Box>
      <Box className="grow">{children}</Box>
    </Box>
  );
}
