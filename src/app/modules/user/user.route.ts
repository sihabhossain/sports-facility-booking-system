import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { authControllers } from "../auth/auth.controller";
import { AuthValidation } from "../auth/auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidation),
  userControllers.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.login
);

export const userRoutes = router;
