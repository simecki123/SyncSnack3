import ProfilePageButton from "@/app/components/profile-page-components/ProfilePageButton";
import SidebarGroups from "@/app/components/sidebar/SidebarGroups";
import { fetchImproved } from "@/app/server-actions/fetch-improved";
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
  console.log(activeUser, "<== successfully logged in");
  if (!activeUser) {
    redirect("/login");
  }

  
  const user: any = await fetchImproved(`/api/profiles/${activeUser?.userProfileId}`);
  const imageUrl = user.photoUrl ?? '';

    console.log("active user look for image ", user );

  return (
    <Box className="flex h-screen items-stretch">
      <Box>
        <SidebarGroups accessToken={activeUser.accessToken} />
        <ProfilePageButton imageUrl={imageUrl} />
      </Box>
      <Box className="grow">{children}</Box>
    </Box>
  );
}
