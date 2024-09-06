import NotificationBell from "@/app/components/layout/NotificationBell";
import SidebarGroups from "@/app/components/sidebar/SidebarGroups";
import { auth } from "@/commons/auth";
import { Box, Image, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const activeUser: any = session?.user;
  console.log(activeUser);
  if (!activeUser) {
    redirect("/login");
  }

  return (
    <Box className="flex h-screen items-stretch">
      <Box>
        <SidebarGroups accessToken={activeUser.accessToken} />
      </Box>
      <NotificationBell />
      <Box className="grow">{children}</Box>
    </Box>
  );
}
