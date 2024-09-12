import AdminButtons from "@/app/components/group/AdminButtons";
import GroupData from "@/app/components/group/GroupData";
import MembersTable from "@/app/components/group/MembersTable";
import { auth } from "@/commons/auth";
import { Box, Image, Text } from "@chakra-ui/react";

export default async function GroupPage() {
  const session: any = await auth();

  return (
    <Box className="pt-16 md:pt-4 md:grid md:grid-cols-2 md:gap-10 md:grid-rows-[1fr_70%] md:h-screen md:ml-6">
      <GroupData session={session} />
      <AdminButtons />
      <Box className="flex flex-col h-full p-10">
        <MembersTable session={session} />
      </Box>
    </Box>
  );
}

function MvpMemberCard({ user }: { user: any }) {
  return (
    <Box className="flex rounded-xl shadow-lg overflow-hidden relative bg-orange-light-1">
      <Image
        className="h-[150px] w-[150px] rounded-l-xl mr-4"
        src={user.photoUrl}
        alt="Profile picture"
        fallbackSrc="/profile_picture.png"
        objectFit="cover"
      />
      <Box className="grow flex flex-col justify-center space-y-2 p-4">
        <Text className="font-semibold">
          {user.firstName} {user.lastName}
        </Text>
        <Box className="flex">
          <Text className="mr-1 italic bg-white p-1 rounded-md font-semibold">
            {user.score.toFixed(2)}⭐
          </Text>
        </Box>
        <Text className="italic">Orders completed: {user.orderCount}</Text>
      </Box>
      <Box className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></Box>
    </Box>
  );
}
//
// const session = await auth();
// const activeUser: any = session?.user;
//
// const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 0;
// const pageSize = 4; // You can adjust this as needed
//
// // change activeUser groupId to localstorage groupid
// const fetchGroupData = async () => {
//   "use server";
//   const data = await fetch(
//     `${process.env.BACKEND_URL}/api/groups/${activeUser?.groupId}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${activeUser.accessToken}`,
//       },
//     },
//   ).then((res) => res.json());
//   return data;
// };
//
// // change this to api/groups/members (no pagination, groupId in header)
// async function fetchMembers() {
//   try {
//     const data = await fetch(`/api/groups/members`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${activeUser.accessToken}`,
//         GroupId: `${localStorage.getItem("groupId")}`,
//       },
//     }).then((res) => res.json());
//     return data;
//   } catch (error) {
//     console.error("Error fetching members:", error);
//     return [];
//   }
// }
//
// await fetch(`${process.env.BACKEND_URL}/api/profiles/scores`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${activeUser?.accessToken}`,
//   },
// });
//
// const orders = await fetchImproved(`/api/profiles/orders/stats`);
// console.log("orders ", orders);
// const completedOrders = orders.filter(
//   (order: { orderStatus: string }) => order.orderStatus === "COMPLETED",
// );
// console.log("Completed Orders: ", completedOrders);
//
// const members = await fetchMembers(currentPage);
// const futureMembers = await fetchMembers(currentPage + 1);
// const groupData = await fetchGroupData();
// const orderDounuts = await fetchImproved(`/api/groups/count`);
//
// const mvpMemberRes = await fetch(
//   `${process.env.BACKEND_URL}/api/groups/top-scorer`,
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${activeUser?.accessToken}`,
//     },
//   },
// );
//
// const mvpMem = await mvpMemberRes.json();
//
// console.log(mvpMem, "mvp");
// console.log(members, "members");
// j
// <Box className="hidden md:flex md:h-full md:items-center md:justify-center">
//   <MvpMemberCard user={mvpMem} orders={completedOrders} />
// </Box>
// <Box>
//   <MembersTable
//     members={members}
//     futureMembers={futureMembers}
//     user={activeUser}
//     currentPage={currentPage}
//   />
// </Box>
// <Box className="hidden md:flex md:justify-center">
//   <GroupOrdersDonut datahero={orderDounuts} />
// </Box>
