import mongoose, { Types } from "mongoose";

type BookingStatus = "confirmed" | "unconfirmed" | "canceled";

// Internal booking type
export type TBooking = {
  date: Date;
  startTime: string;
  endTime: string;
  user: mongoose.Types.ObjectId; // Ensure correct type for user ID
  facility: Types.ObjectId; // Ensure correct type for facility ID
  payableAmount: number;
  isBooked: BookingStatus;
};

// Response type for API
export type TBookingResponse = {
  _id: string; // The _id should always be present in the response
  date: string; // Converted to string for date representation
  startTime: string;
  endTime: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  facility: {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    location: string;
    image: string;
    isDeleted: boolean;
  };
  payableAmount: number;
  isBooked: BookingStatus;
};
