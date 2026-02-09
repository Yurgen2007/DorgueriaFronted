import { axiosAPI } from "../axiosAPI";

import { forgotPassword } from "@/types/Usuario";

export async function postForgotPassword(data: forgotPassword): Promise<any> {
  const response = await axiosAPI.post("auth/forgot-password", data);

  return response.data;
}
