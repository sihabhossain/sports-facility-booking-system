/* eslint-disable @typescript-eslint/no-explicit-any */
export type TResponse = {
  success: boolean;
  status?: number;
  token?: string;
  message: string;
  data: any;
};
