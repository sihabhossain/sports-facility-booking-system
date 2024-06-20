import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { User } from "../user/user.model";
import { authServices } from "./auth.services";

const login = catchAsync(async (req, res) => {
  // Access email from req.body
  const { email } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Handle case where user is not found
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await authServices.loginUser(req.body);

  // Set refreshToken in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  // Send response
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: accessToken,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  });
});

export const authControllers = {
  login,
};
