import checkConflictTime from "../../utils/conflictTimeCheck";
import stringToMuniteInNumber from "../../utils/stringToMinute";
import { TBooking } from "./booking.interface";

// creat calculatePayableAmount function
export function calculatePayableAmount(
  startTime: string,
  endTime: string,
  perHour: number
) {
  // Convert the hours and minutes into minutes
  const startMinutes = stringToMuniteInNumber(startTime);
  const endMinutes = stringToMuniteInNumber(endTime);

  // Calculate the time difference in minutes
  const timeDiffInMinutes = endMinutes - startMinutes;

  // Convert the time difference back to hours and minutes
  const hours = timeDiffInMinutes / 60;

  // Return the payableAmount
  return hours * perHour;
}

// creat isTimeConflict function
export const isTimeConflict = (
  bookingsFromDB: TBooking[],
  bookingFromCLient: TBooking
) => {
  for (let i = 0; i < bookingsFromDB.length; i++) {
    // each booking
    const eachBooking = bookingsFromDB[i];

    const isConflict = checkConflictTime(
      bookingFromCLient.startTime,
      bookingFromCLient.endTime,
      eachBooking.startTime,
      eachBooking.endTime
    );

    if (isConflict) {
      return true;
    }
  }
  return false;
};
