import CreateEventButtonModal from "@/app/components/group-events/CreateEventButtonModal";
import GroupEventCard from "@/app/components/group-events/GroupEventCard";
import { Box } from "@chakra-ui/react";

export default async function GroupEventsPage({ searchParams }: any) {
  return (
    <Box className="m-2">
      <CreateEventButtonModal />
      <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 md:m-20 gap-4">
        <GroupEventCard />
      </Box>
    </Box>
  );
}
