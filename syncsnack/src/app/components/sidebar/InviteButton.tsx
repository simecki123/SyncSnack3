"use client";
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function InviteButton() {
  const { data: session, status }: any = useSession();
  const [url, setUrl] = useState("...");
  const toast = useToast();

  console.log(url);

  return (
    <Button
      className="w-full"
      onClick={() => handleInvite(setUrl, session, toast)}
    >
      Invite
    </Button>
  );
}

function handleInvite(setUrl: any, session: any, toast: any) {
  fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/sendInvitation?invitedBy=${session.user.userProfileId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    },
  )
    .then((res) => res.text())
    .then((data) => {
      setUrl(data);
      toast({
        title: "Invitation sent!",
        description: "Your invitation link is ready to be shared.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigator.clipboard.writeText(data);
      // TODO: take the code out of the link and then make a page to redirect
    })
    .catch((e) => console.log(e));
}
