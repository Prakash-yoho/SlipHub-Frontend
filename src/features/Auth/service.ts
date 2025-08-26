/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../api/index'

export const verifyOtp = async (params: any) => {
  try {
    const response = await Client.auth.verify_otp(params);
    return response;
  } catch (error: any) {
    throw new Error(error.message || "Failed to verify OTP");
  }
};

export const dashboadService = async (params: any) => {
  try {
    const response = await Client.common.dashboard(params ?? "")
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to dashboard");
  }
}