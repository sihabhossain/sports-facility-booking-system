// creat stringToMuniteInNumber function
const stringToMuniteInNumber = (time: string) => {
  // hour and munite arr ["HH", "MM"]
  const hourAndMinuteArr = time.split(":");

  // Convert the hours and minutes into minutes
  const totalMinutes =
    parseInt(hourAndMinuteArr[0]) * 60 + parseInt(hourAndMinuteArr[1]);

  return totalMinutes;
};

export default stringToMuniteInNumber;
