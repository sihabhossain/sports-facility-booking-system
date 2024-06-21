import { catchAsync } from "../../utils/catchAsync";
import bookingService from "./booking.services";
import sendResponse from "../../utils/sendResponse";

// Get all bookings
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookings();

  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
});

// Get all bookings of a specific user
const getAllBookingsOfUser = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await bookingService.getAllBookingsOfUser(req.user?.email);

  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      status: 404,
      message: "No Data Found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
});

// Create a new booking
const createBooking = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const email = req.user?.email;
  const result = await bookingService.createBooking(email, req.body);

  sendResponse(res, {
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

// Delete (cancel) a booking
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingService.deleteBooking(id);

  sendResponse(res, {
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

// Export booking controllers
const bookingControllers = {
  getAllBookings,
  getAllBookingsOfUser,
  createBooking,
  deleteBooking,
};

export default bookingControllers;
