import stringToMuniteInNumber from "./stringToMinute";

// creat checkConfictTime function
const checkConflictTime = (
  firstStartTime: string,
  firstEndTime: string,
  secondStartTime: string,
  secondEndTime: string
) => {
  // start time of first booking in mumber
  const startTimeOfFirstInNumber = stringToMuniteInNumber(firstStartTime);

  // end time of first booking in mumber
  const endTimeOfFirstInNumber = stringToMuniteInNumber(firstEndTime);
  // start time of each booking in mumber
  const startTimeOfSecondInNumber = stringToMuniteInNumber(secondStartTime);

  // end time of each booking in mumber
  const endTimeOfSecondInNumber = stringToMuniteInNumber(secondEndTime);

  // check if time is conflict or not
  if (
    (startTimeOfFirstInNumber >= startTimeOfSecondInNumber &&
      startTimeOfFirstInNumber < endTimeOfSecondInNumber) ||
    (endTimeOfFirstInNumber > startTimeOfSecondInNumber &&
      endTimeOfFirstInNumber < endTimeOfSecondInNumber)
  ) {
    // means time will be conflict
    return true;
  }

  // time will ne not conflict
  return false;
};

export default checkConflictTime;
