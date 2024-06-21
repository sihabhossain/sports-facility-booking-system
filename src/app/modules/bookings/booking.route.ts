import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "../user/user.constant";
import { bookingValidations } from "./bookings.validation";
import bookingControllers from "./booking.controller";

const router = express.Router();

router.post(
  "/bookings",
  validateRequest(bookingValidations.createBookingValidation),
  auth(USER_Role.USER),
  bookingControllers.createBooking
);




export const bookingRoutes = router;
