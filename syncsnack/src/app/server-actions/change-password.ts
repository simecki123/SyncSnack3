"use server";
import { redirect } from "next/navigation";
import z from "zod";

/**
 * This is server function that handles change of the password when user forgets his password.
 * @param prevState 
 * @param formData 
 * @returns 
 */

export async function handleChangePassword(prevState: any, formData: FormData) {
    /**
     * Zod is checking if everything is ok about inputs
     */
  const schema = z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6),
    passwordResetTokenId: z.string(),
    resetCode: z.string(),
  });

  console.log("passw: ", formData.get("confirmPassword"))

  /**
   * Validate fields will make sure all data that is needed for updating password is ready
   */
  const validatedFields = schema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
    passwordResetTokenId: formData.get("passwordResetTokenId"),
    resetCode: formData.get("resetCode"),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input",
    };
  }

  if (validatedFields.data.newPassword !== validatedFields.data.confirmPassword) {
    return {
      message: "Passwords do not match",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordResetTokenId: validatedFields.data.passwordResetTokenId,
        resetCode: validatedFields.data.resetCode,
        newPassword: validatedFields.data.newPassword,
      }),
    });

    if (response.ok) {
      redirect('/login');
    } else {
      return {
        message: "Failed to reset password",
      };
    }
  } catch (e: any) {
    return {
      message: "Error occurred during password reset",
    };
  }
}
