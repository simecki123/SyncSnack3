"use server";

import { auth } from "@/commons/auth";
import { z } from "zod";

/**
 * This function handles user input validation on event creation and
 * sends a request to try creating the event for the user.
 *
 * @author Andrija Skontra
 */
export async function handleCreateOrder(prevState: any, formData: FormData) {
  // console log form data names: milk, sugar, type, desc
  //
  console.log(formData.get("milk"));
  console.log(formData.get("sugar"));
  console.log(formData.get("type"));
  console.log(formData.get("desc"));
}

async function sendCreateEventRequest(
  validatedFields: any,
  formData: FormData,
) {
  const session = await auth();
  const activeUser: any = session?.user;
  const res = await fetch(`${process.env.BACKEND_URL}/api/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeUser.accessToken}`,
      groupId: `${formData.get("groupId")}`,
    },
    body: JSON.stringify(validatedFields.data),
  });
  if (!res.ok) {
    throw new Error("Failed to create event");
  }
}

function validateUserInput(formData: FormData) {
  const schema = z.object({
    eventType: z.string(),
    title: z.string().min(2),
    description: z.string(),
    pendingTime: z.number(),
  });

  const pendingTime: any = formData.get("timeSelect");
  const pendingTimeNum: number = +pendingTime;

  const validatedFields = schema.safeParse({
    eventType: formData.get("eventType"),
    title: formData.get("eventTitle"),
    description: formData.get("eventDescription"),
    pendingTime: pendingTimeNum,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid Event");
    // include if you want error specific for the input field
    // errors: validatedFields.error.flatten().fieldErrors,
  }
  return validatedFields;
}
