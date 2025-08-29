/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../api/index'

export const Signin = async (params?: any) => {
  try {
    const response = await Client.auth.login(params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};