import { z } from "zod";

const BookingStatus = z.enum(["confirmed", "unconfirmed", "canceled"]);

export const createBookingValidation = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
    user: z.string(),
    facility: z.string(),
    payableAmount: z.number().positive(),
    isBooked: BookingStatus,
  }),
});

export const bookingValidations = {
  createBookingValidation,
};
