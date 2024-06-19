import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcryptjs from "bcryptjs";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  //check if password matched
  const isPasswordMatched = async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const isMatched = await bcryptjs.compare(plainPassword, hashedPassword);
    return isMatched;
  };

  if (!(await isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  }

  // jwt
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  // access token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return { accessToken, refreshToken };
};

export const authServices = {
  loginUser,
};
