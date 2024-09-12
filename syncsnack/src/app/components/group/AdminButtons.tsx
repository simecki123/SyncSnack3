"use client";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function AdminButtons() {
  const [isAdmin, setIsAdmin] = useState(null);
  return (
    <Box>
      <Button>Modify Roles</Button>
    </Box>
  );
}
