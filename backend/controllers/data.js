
import { getTrainDetails } from "../utils/getTrainDetails.js";
import { getDateDetails } from "../utils/getDateInfo.js";
import { checkValidityOfDate } from "../utils/checkValidityOfDate.js";
import axios from "axios";

export const getData = async (req, res) => {
  try {
    const { trainNumber, date } = req.body;
    // console.log("trainNumber",trainNumber);
    // console.log("date",date);
    // Validate input
    
    if (!trainNumber || !date) {
      return res.status(400).json({
        success: false,
        message: "Train number and date are required.",
      });
    }

    // Fetch train details
    const train_details = getTrainDetails(trainNumber);
    if (!train_details || train_details.error) {
      return res.status(404).json({
        success: false,
        message: "Train not found.",
        details: train_details?.error || null,
      });
    }
    //console.log("Fetched train_details:", train_details);

    // Validate if the train runs on the given date
    const isDateValid = checkValidityOfDate(train_details, date);
    if (!isDateValid) {
      return res.status(400).json({
        success: false,
        message: "Train not running on the given date.",
      });
    }

    // Check date validity with getDateDetails
    const date_details = getDateDetails(date);
    if (date_details === null) {
      return res.status(400).json({
        success: false,
        message: "Please do not enter too old a date.",
      });
    }

    // Extract train start and end stations
    const train_start = train_details.Stations[0];
    const train_end = train_details.Stations[train_details.Stations.length - 1];
    if (!train_start || !train_end) {
      throw new Error("Invalid Stations data in train details.");
    }

    // Construct the API URL
    const formattedTrainName = train_details.Train_name.replace(/\s+/g, "-").toLowerCase();
    const url = `https://www.railyatri.in/_next/data/${process.env.API_KEY}/live-train-status/${trainNumber}-${formattedTrainName}-${train_start.toLowerCase()}-to-${train_end.toLowerCase()}.json?utm_source=lts_dweb_Check_status&start_day=${date_details}&trainNumber=${trainNumber}-${formattedTrainName}-${train_start.toLowerCase()}-to-${train_end.toLowerCase()}`;

    //console.log("Constructed URL:", url);

    // Fetch data from external API
    const response = await axios.get(url);
    const data = response.data;

    // Validate API response structure
    if (!data?.pageProps?.ltsData) {
      throw new Error("Invalid response structure from API.");
    }
   // console.log("API Response:", data);

    // Send success response
    return res.status(200).json({
      success: true,
      response: data,
      message: "Successfully fetched data.",
    });
    
  } catch (error) {
    // Log the error
    console.error("Data error:", error);

    // Send error response
    return res.status(400).json({
      success: false,
      message: error.message,
    });
    
  }
};
