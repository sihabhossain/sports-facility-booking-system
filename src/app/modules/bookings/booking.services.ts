/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppError from "../../errors/AppError";
import Facility from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { calculatePayableAmount, isTimeConflict } from "./booking.utils";

// Helper function to transform Mongoose document to TBooking
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformBooking = (booking: any): TBooking => {
  if (!booking) {
    throw new AppError(500, "Booking is null or undefined");
  }

  return {
    _id: booking._id?.toString(),
    date: booking.date?.toISOString().split("T")[0],
    startTime: booking.startTime,
    endTime: booking.endTime,
    user: {
      _id: booking.user?._id?.toString(),
      // @ts-ignore
      name: booking.user?.name || "",
      email: booking.user?.email || "",
      phone: booking.user?.phone || "",
      address: booking.user?.address || "",
    },
    facility: {
      _id: booking.facility?._id?.toString(),
      // @ts-ignore
      name: booking.facility?.name || "",
      description: booking.facility?.description || "",
      pricePerHour: booking.facility?.pricePerHour || 0,
      location: booking.facility?.location || "",
      image: booking.facility?.image || "",
      isDeleted: booking.facility?.isDeleted || false,
    },
    payableAmount: booking.payableAmount || 0,
    isBooked: booking.isBooked,
  };
};

// Get all bookings
const getAllBookings = async (): Promise<TBooking[]> => {
  const bookings = await Booking.find({ isBooked: "confirmed" }).populate([
    "facility",
    "user",
  ]);

  return bookings.map(transformBooking);
};

// Get all bookings of a specific user
const getAllBookingsOfUser = async (userEmail: string): Promise<TBooking[]> => {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const bookings = await Booking.find({ user: user._id }).populate(
    "facility user"
  );
  return bookings.map(transformBooking);
};

// Create a new booking
const createBooking = async (
  userEmail: string,
  payload: TBooking
): Promise<TBooking> => {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const facility = await Facility.findById(payload.facility);

  if (!facility) {
    throw new AppError(404, "Facility not found!");
  }

  if (facility.isDeleted) {
    throw new AppError(400, "Facility has been deleted!");
  }

  const conflictingBookings = await Booking.find({
    date: payload.date,
    isBooked: "confirmed",
  });

  const timeWillConflict = isTimeConflict(conflictingBookings, payload);

  if (timeWillConflict) {
    throw new AppError(400, "Booking time conflicts with another booking!");
  }

  const payableAmount = calculatePayableAmount(
    payload.startTime,
    payload.endTime,
    facility.pricePerHour
  );

  if (payableAmount <= 0) {
    throw new AppError(400, "Start time must be less than end time!");
  }

  payload.payableAmount = Number(payableAmount.toFixed(0));

  const booking = await Booking.create({
    ...payload,
    user: user._id,
  });

  return transformBooking(booking);
};

// Delete (cancel) a booking
const deleteBooking = async (_id: string): Promise<TBooking> => {
  const booking = await Booking.findByIdAndUpdate(
    _id,
    { isBooked: "canceled" },
    { new: true }
  ).populate("facility user");

  if (!booking) {
    throw new AppError(404, "Booking not found!");
  }

  return transformBooking(booking);
};

// Booking services
const bookingService = {
  getAllBookings,
  getAllBookingsOfUser,
  createBooking,
  deleteBooking,
};

export default bookingService;
