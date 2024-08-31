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

router.get(
  "/bookings",
  auth(USER_Role.ADMIN),
  bookingControllers.getAllBookings
);

router.get(
  "/bookings/user",
  auth(USER_Role.USER),
  bookingControllers.getAllBookingsOfUser
);

router.delete("/bookings/:id", bookingControllers.deleteBooking);

export const bookingRoutes = router;
