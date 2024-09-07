// All sort options we have for this app for leaderboard
export enum SortOption {
  ORDER_COUNT = "ORDER_COUNT",
  SCORE = "SCORE",
  FIRSTNAME = "FIRSTNAME",
}

export type GroupEvent = {
  eventId: string;
  userProfileId: string;
  userProfileFirstName: string;
  userProfileLastName: string;
  title: string;
  description: string;
  eventType: "FOOD" | "COFFEE" | "BEVERAGE";
  groupId: string;
  status: string;
  createdAt: string;
  pendingUntil: string;
  photoUrl: string;
};
