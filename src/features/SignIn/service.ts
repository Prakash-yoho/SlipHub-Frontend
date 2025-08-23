/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../api/index'

export const Signin = async (params?: any) => {
  try {
    const response = await Client.auth.login(params);
    console.log("Backend FAQ data:", response);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};