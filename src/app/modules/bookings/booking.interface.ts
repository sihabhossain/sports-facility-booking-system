import mongoose, { Types } from "mongoose";

type BookingStatus = "confirmed" | "unconfirmed" | "canceled";

export type TBooking = {
  date: Date;
  startTime: string;
  endTime: string;
  user: mongoose.Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: BookingStatus;
};

export type TBookingResponse = {
  _id?: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  payableAmount: number;
  message: string;
};
