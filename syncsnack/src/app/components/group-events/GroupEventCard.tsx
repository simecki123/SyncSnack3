import { Box, Text, Progress, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function GroupEventCard() {
  const t = useTranslations("Group events page");
  return (
    <Box className="border rounded-lg p-4 w-full mx-auto h-40 shadow-lg">
      <Box className="flex justify-between mb-4">
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Name
          </Text>
          <Text fontSize="sm">Description here</Text>
        </Box>
        <Box>
          <Text fontSize="sm">Firstname</Text>
          <Text fontSize="sm">Lastname</Text>
        </Box>
      </Box>

      <Box className="flex justify-center mb-4">
        <Button colorScheme="xorange">{t("Make Order")}</Button>
      </Box>

      <Progress
        className="rounded-full"
        size="sm"
        colorScheme="xorange"
        value={50}
      />
    </Box>
  );
}
