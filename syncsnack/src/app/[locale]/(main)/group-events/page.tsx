import CreateEventButtonModal from "@/app/components/group-events/CreateEventButtonModal";
import GroupEventCard from "@/app/components/group-events/GroupEventCard";
import GroupEvents from "@/app/components/group-events/GroupEvents";
import { Box } from "@chakra-ui/react";

export default async function GroupEventsPage() {
  return (
    <Box className="m-2">
      <CreateEventButtonModal />
      <GroupEvents />
    </Box>
  );
}
