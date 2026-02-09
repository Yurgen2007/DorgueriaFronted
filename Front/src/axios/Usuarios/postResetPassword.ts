import { axiosAPI } from "../axiosAPI";

import { resetPassword } from "@/types/Usuario";

export async function postResetPassword(
  token: string,
  data: resetPassword,
): Promise<any> {
  const response = await axiosAPI.post(
    `auth/reset-password?token=${token}`,
    data,
  );

  return response.data;
}
