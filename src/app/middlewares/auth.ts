import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { catchAsync } from "../utils/catchAsync";
import { USER_Role } from "../modules/user/user.constant";

type UserRole = (typeof USER_Role)[keyof typeof USER_Role];

export const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const verifiedToken = jwt.verify(
      accessToken.replace("Bearer ", ""),
      config.jwt_access_secret as string
    );

    const { role, email } = verifiedToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role as UserRole)) {
      throw new AppError(401, "You are not authorized to access this route");
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = user;

    next();
  });
};
