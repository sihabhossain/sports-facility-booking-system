import { Response } from "express";
import { TResponse } from "../interface/response.interface";

// HOF for send response
const sendResponse = (res: Response, data: TResponse) => {
  res.status(200).send(data);
};

export default sendResponse;
