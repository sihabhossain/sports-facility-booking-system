import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidation),
  userControllers.createUser
);

export const userRoutes = router;
