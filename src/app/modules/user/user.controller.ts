import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
};
