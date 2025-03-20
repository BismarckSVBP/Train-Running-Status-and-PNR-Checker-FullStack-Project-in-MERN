export const checkValidityOfDate = (train_details, dateString) => {
  // console.log("Train Details at Runtime:", train_details);
  // console.log("Date String:", dateString);

  // Validate train_details
  if (!train_details || !train_details.Runs_on) {
    throw new Error("Invalid train_details: Missing Runs_on property");
  }

  // Validate dateString
  if (!dateString) {
    throw new Error("Invalid dateString: Received undefined or empty value");
  }

  // Parse the dateString
  const [day, month, year] = dateString.split("-").map(Number);
  if (!day || !month || !year) {
    throw new Error("Invalid dateString: Failed to parse day, month, or year");
  }

  // Create a Date object
  const date = new Date(year, month - 1, day);

  // Map days to array
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const givenDay = days[date.getDay()];
  //console.log("Given Day:", givenDay);

  // Check if train runs on this day
  return train_details.Runs_on[givenDay] === 1;
};
