//export const getDateDetails = (date) => {
 // if (!date) {
  //  console.error("Invalid date: No date provided.");
  //  return null;
 // }

  // Validate date format (expected DD-MM-YYYY)
//  if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
  //  console.error("Invalid date format: Expected DD-MM-YYYY.");
   // return null;
 // }

  // Parse the DD-MM-YYYY format and convert to YYYY-MM-DD
  //const [day, month, year] = date.split("-").map(Number);
 // const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  // Parse the reformatted date
//  const givenDate = new Date(formattedDate).setHours(0, 0, 0, 0);
 // const today = new Date().setHours(0, 0, 0, 0);

  // Check if date parsing failed
 // if (isNaN(givenDate)) {
  //  console.error("Invalid date: Unable to parse the date.");
 //   return null;
//  }

  // Calculate the difference in days
 // const differenceInDays = (today - givenDate) / (24 * 60 * 60 * 1000);
 // console.log("Date Difference in Days:", differenceInDays);

  // Return appropriate values
 // if (differenceInDays === 0) return 0; // Today
 // if (differenceInDays === 1) return 1; // Yesterday
//  if (differenceInDays === 2) return 2; // Two days ago

  // Handle too old or future dates
  //if (differenceInDays > 2) {
   // console.warn("Date is too old.");
   // return null;
 // }
  //if (differenceInDays < 0) {
  //  console.warn("Date is in the future.");
  //  return null;
//  }

  // Default fallback
//  return null;
//};



export const getDateDetails = (date) => {
  if (!date) {
    console.error("Invalid date: No date provided.");
    return null;
  }

  // Validate date format (expected DD-MM-YYYY)
  if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
    console.error("Invalid date format: Expected DD-MM-YYYY.");
    return null;
  }

  // Parse the DD-MM-YYYY format
  const [day, month, year] = date.split("-").map(Number);

  // Create date object in IST timezone
  const givenDateUTC = new Date(Date.UTC(year, month - 1, day));
  const givenDateIST = new Date(givenDateUTC.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
  givenDateIST.setHours(0, 0, 0, 0); // Normalize time

  // Get today's date in IST
  const nowUTC = new Date();
  const nowIST = new Date(nowUTC.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
  nowIST.setHours(0, 0, 0, 0); // Normalize time

  // Calculate the difference in days
  const differenceInDays = (nowIST - givenDateIST) / (24 * 60 * 60 * 1000);

  // Return appropriate values
  if (differenceInDays === 0) return 0; // Today
  if (differenceInDays === 1) return 1; // Yesterday
  if (differenceInDays === 2) return 2; // Two days ago

  // Handle too old or future dates
  if (differenceInDays > 2) {
    console.warn("Date is too old.");
    return null;
  }
  if (differenceInDays < 0) {
    console.warn("Date is in the future.");
    return null;
  }

  return null; // Default fallback
};
