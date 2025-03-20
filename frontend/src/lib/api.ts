import {
  Train,
  TrainRoute,
  Station,
  RecentSearch,
  PNRDetails,
  BackendCoachResponse,
  PNRErrorResponse,
  TrainStatusLtsData,
} from "./types";



import axios from "axios";

import { API_BASE_URL } from "@/config"; // ✅ Use config.ts

// Function to safely extract ltsData from the server response
export const extractLtsData = (serverData: any): TrainStatusLtsData | null => {
  try {
    // Handle multiple possible response formats
    if (serverData?.response?.pageProps?.ltsData) {
      return serverData.response.pageProps.ltsData;
    }
    if (serverData?.pageProps?.ltsData) {
      return serverData.pageProps.ltsData;
    }
    if (serverData?.ltsData) {
      return serverData.ltsData;
    }
    console.error("Unable to extract ltsData:", serverData);
    return null;
  } catch (error) {
    console.error("Error extracting ltsData:", error);
    return null;
  }
};

// Function to create a Train object from ltsData
export const getDefaultTrain = (response: any): Train => {
  if (!response || !response.data) {
    throw new Error("No data received for train route");
  }

  const ltsData = extractLtsData(response.data);

  if (!ltsData) {
    throw new Error("Invalid train data format received from server");
  }

  const status =
    ltsData.delay > 0
      ? "Delayed"
      : ltsData.status === "D"
      ? "Departed"
      : "On Time";

  const nextStation = ltsData.upcoming_stations?.find(
    (station) => station.station_name && station.station_code
  );

  return {
    number: ltsData.train_number,
    name: ltsData.train_name,
    from: `${ltsData.source_stn_name} (${ltsData.source})`,
    to: `${ltsData.dest_stn_name} (${ltsData.destination})`,
    status: status,
    delayMinutes: ltsData.delay || 0,
    currentStation: ltsData.current_station_name || "Unknown",
    nextStation: nextStation?.station_name || "Unknown",
    startDate: ltsData.train_start_date || "Unknown",
    type: ltsData.train_name.includes("Express")
      ? "Express"
      : ltsData.train_name.includes("Mail")
      ? "Mail"
      : "Passenger",
    platform: ltsData.platform_number?.toString() || "Unknown",
  };
};

// Function to fetch train data from backend
export const TrainDataFromBackend = async (
  trainNumber: string,
  date: Date
): Promise<any> => {
  try {
    if (!trainNumber) {
      throw new Error("Train number is required");
    }

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;

    //    console.log(`Fetching train data for ${trainNumber} on ${formattedDate}`);
    const response = await axios.post(`${API_BASE_URL}data`, {
      trainNumber,
      date: formattedDate,
    });
    if (!response || !response.data) {
      throw new Error("No data received from backend");
    }

    //console.log("API response received:", response.data);
    return response;
 
  } catch (error) {
    console.error("Error in TrainDataFromBackend:", error);
    throw error;
  }
};

// Function to fetch train details
export const searchTrain = async (response: any): Promise<Train | null> => {
  try {
    if (!response || !response.data) {
      console.error("Invalid response format:", response);
      throw new Error("No data received");
    }

    const train = getDefaultTrain(response);

    if (train) {
      saveRecentSearch({
        trainNumber: train.number,
        trainName: train.name,
        searchedAt: new Date(),
      });
    }

    return train;
  } catch (error) {
    console.error("Error in searchTrain:", error);
    return null;
  }
};

// Function to fetch train route details
export const getTrainRoute = async (
  response: any
): Promise<TrainRoute | null> => {
  try {
    if (!response?.data) {
      throw new Error("No data received for train route");
    }

    const ltsData = extractLtsData(response.data);

    if (!ltsData) {
      throw new Error("Invalid train route data format");
    }

    const allStations: Station[] = [];

    ltsData.previous_stations?.forEach((station) => {
      if (station.station_code && station.station_name) {
        allStations.push({
          name: station.station_name,
          code: station.station_code,
          arrivalTime: station.sta || "-",
          departureTime: station.std || "-",
          platform: station.platform_number?.toString() || "Unknown",
          status: "passed",
          distanceFromStart: station.distance_from_source,
          delay: station.arrival_delay || 0,
        });
      }
    });

    if (ltsData.current_station_code && ltsData.current_station_name) {
      allStations.push({
        name: ltsData.current_station_name,
        code: ltsData.current_station_code,
        arrivalTime: ltsData.cur_stn_sta || "-",
        departureTime: ltsData.cur_stn_std || "-",
        platform: ltsData.platform_number?.toString() || "Unknown",
        status: "active",
        distanceFromStart: ltsData.distance_from_source,
        delay: ltsData.delay || 0,
      });
    }

    ltsData.upcoming_stations?.forEach((station) => {
      if (station.station_code && station.station_name) {
        allStations.push({
          name: station.station_name,
          code: station.station_code,
          arrivalTime: station.sta || "-",
          departureTime: station.std || "-",
          platform: station.platform_number?.toString() || "Unknown",
          status: "upcoming",
          distanceFromStart: station.distance_from_source,
          delay: station.arrival_delay || 0,
        });
      }
    });

    const travelPercentage = ltsData.total_distance
      ? (ltsData.distance_from_source / ltsData.total_distance) * 100
      : 0;

    return {
      train: getDefaultTrain(response),
      stations: allStations,
      travelPercentage: Math.min(Math.max(travelPercentage, 0), 100),
    };
  } catch (error) {
    console.error("Error in getTrainRoute:", error);
    return null;
  }
};

const RECENT_SEARCHES_KEY = "train_tracker_recent_searches";
const MAX_RECENT_SEARCHES = 5;

// Recent searches management
export const saveRecentSearch = (search: RecentSearch): void => {
  try {
    // Get existing searches
    const existingSearchesJSON = localStorage.getItem(RECENT_SEARCHES_KEY);
    const existingSearches: RecentSearch[] = existingSearchesJSON
      ? JSON.parse(existingSearchesJSON)
      : [];

    // Remove this train if it already exists (to avoid duplicates)
    const filteredSearches = existingSearches.filter(
      (s) => s.trainNumber !== search.trainNumber
    );

    // Add new search to the beginning
    const updatedSearches = [search, ...filteredSearches].slice(
      0,
      MAX_RECENT_SEARCHES
    );

    // Save back to localStorage
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error("Error saving recent search:", error);
  }
};

export const getRecentSearches = (): RecentSearch[] => {
  try {
    const searchesJSON = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!searchesJSON) return [];

    const searches: RecentSearch[] = JSON.parse(searchesJSON);
    return searches.map((search) => ({
      ...search,
      searchedAt: new Date(search.searchedAt),
    }));
  } catch (error) {
    console.error("Error retrieving recent searches:", error);
    return [];
  }
};

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error("Error clearing recent searches:", error);
  }
};

export const getPnrStatus = async (
  pnrNumber: string
): Promise<{ data: PNRDetails | null; error: PNRErrorResponse | null }> => {
  try {
    if (!pnrNumber || pnrNumber.length !== 10) {
      return {
        data: null,
        error: {
          errorcode: "100",
          errormsg: "Invalid PNR Format",
          detailedmsg: "Please enter a valid 10-digit PNR number",
        },
      };
    }


    // // Check if we have mock data for this PNR
    // const mockData = mockPnrData[pnrNumber];
    const response = await axios.post(`${API_BASE_URL}getPNRData`, {
      pnr_number: pnrNumber,
    });
    if (!response || !response.data) {
      throw new Error("No data received from backend");
    }

    //console.log("API response received:", response.data);
    const mockData = response.data;
    console.log("mockdatahoonmc", mockData);
    if (mockData) {
      return { data: mockData.response, error: null };
    }
   else{
     throw new Error("No data received from backend");
   }
  } catch (error) {
    console.error("Error in getPnrStatus:", error);
    return {
      data: null,
      error: {
        errorcode: "500",
        errormsg: "Could not process your request. Please try again later.",
        detailedmsg:
          "The PNR Number you've entered is either wrong or has been flushed.",
      },
    };
  }
};












//to show dummy coach position data


// Mock coach position data
const MOCK_COACH_POSITION: BackendCoachResponse = {
  ResponseCode: "200",
  TrainNumber: "12565",
  Coaches: [
    { SerialNo: "1", Code: "ENG", Name: "Engine", Number: "ENG" },
    {
      SerialNo: "2",
      Code: "GRD",
      Name: "General + Disabled + Luggage + Brake",
      Number: "GRD",
    },
    { SerialNo: "3", Code: "GEN", Name: "General", Number: "GN" },
    { SerialNo: "4", Code: "GEN", Name: "General", Number: "GN" },
    { SerialNo: "5", Code: "SL", Name: "Sleeper", Number: "S1" },
    { SerialNo: "6", Code: "SL", Name: "Sleeper", Number: "S2" },
    { SerialNo: "7", Code: "SL", Name: "Sleeper", Number: "S3" },
    { SerialNo: "8", Code: "SL", Name: "Sleeper", Number: "S4" },
    { SerialNo: "9", Code: "SL", Name: "Sleeper", Number: "S5" },
    { SerialNo: "10", Code: "SL", Name: "Sleeper", Number: "S6" },
    { SerialNo: "11", Code: "SL", Name: "Sleeper", Number: "S7" },
    { SerialNo: "12", Code: "SL", Name: "Sleeper", Number: "S8" },
    { SerialNo: "13", Code: "SL", Name: "Sleeper", Number: "S9" },
    { SerialNo: "14", Code: "SL", Name: "Sleeper", Number: "S10" },
    { SerialNo: "15", Code: "SL", Name: "Sleeper", Number: "S11" },
    { SerialNo: "16", Code: "SL", Name: "Sleeper", Number: "S12" },
    { SerialNo: "17", Code: "SL", Name: "Sleeper", Number: "S13" },
    { SerialNo: "18", Code: "PC", Name: "Pantry", Number: "PC" },
    { SerialNo: "19", Code: "AC", Name: "AC 3 Tier (64 Seats)", Number: "B1" },
    { SerialNo: "20", Code: "AC", Name: "AC 2 Tier (46 Seats)", Number: "A1" },
    { SerialNo: "21", Code: "AC", Name: "AC First + AC 2 Tier", Number: "HA1" },
    { SerialNo: "22", Code: "AC", Name: "AC First + AC 2 Tier", Number: "HA2" },
    { SerialNo: "23", Code: "GEN", Name: "General", Number: "GN" },
    { SerialNo: "24", Code: "GEN", Name: "General", Number: "GN" },
    {
      SerialNo: "25",
      Code: "GRD",
      Name: "General + Disabled + Luggage + Brake",
      Number: "GRD",
    },
  ],
  Status: "SUCCESS",
  LastUpdate: "2018-09-19 01:53:37 AM",
};


// // Function to get coach arrangement
export const getCoachArrangement = async (
  trainNumber: string
): Promise<
  Array<{
    id: string;
    type: string;
    totalSeats: number;
    availableSeats?: number;
    position: number;
  }>
> => {
  try {
    // Input validation
    if (!trainNumber) {
      throw new Error("Train number is required");
    }

    //console.log(`Getting coach arrangement for train ${trainNumber}`);

    // Convert backend coach data to frontend format
    return MOCK_COACH_POSITION.Coaches.map((coach, index) => {
      // Extract seat count from Name if available
      let totalSeats = 0;
      const seatsMatch = coach.Name.match(/\((\d+) Seats\)/);
      if (seatsMatch && seatsMatch[1]) {
        totalSeats = parseInt(seatsMatch[1]);
      } else {
        // Assign default values based on coach type
        if (coach.Code === "SL") totalSeats = 72;
        else if (coach.Code === "AC" && coach.Name.includes("3 Tier"))
          totalSeats = 64;
        else if (coach.Code === "AC" && coach.Name.includes("2 Tier"))
          totalSeats = 46;
        else if (coach.Code === "AC" && coach.Name.includes("First"))
          totalSeats = 18;
      }

      // Generate random available seats for demo
      const availableSeats =
        totalSeats > 0 ? Math.floor(Math.random() * totalSeats) : undefined;

      return {
        id: coach.Number,
        type: coach.Name,
        totalSeats,
        availableSeats,
        position: parseInt(coach.SerialNo),
      };
    });
  } catch (error) {
    console.error("Error in getCoachArrangement:", error);
    throw error;
  }
};



















//to shoh dummy data 

import { PNRDetails } from './types';

// Mock PNR data with different status scenarios
const mockPnrData: Record<string, PNRDetails> = {
  '1234567890': {
    pnrNumber: '1234567890',
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Howrah (HWH)',
    boardingPoint: 'New Delhi (NDLS)',
    reservationUpTo: 'Howrah (HWH)',
    dateOfJourney: '2023-10-15',
    departureTime: '17:00',
    arrivalTime: '09:45',
    bookingClass: '3A',
    chartPrepared: true,
    passengers: [
      {
        number: 1,
        bookingStatus: 'CNF',
        currentStatus: 'CNF/B2/34/LB',
        coachNumber: 'B2',
        seatNumber: '34',
        seatType: 'Lower Berth'
      },
      {
        number: 2,
        bookingStatus: 'CNF',
        currentStatus: 'CNF/B2/36/UB',
        coachNumber: 'B2',
        seatNumber: '36',
        seatType: 'Upper Berth'
      }
    ]
  },
  '9876543210': {
    pnrNumber: '9876543210',
    trainNumber: '12302',
    trainName: 'New Delhi Rajdhani Express',
    from: 'Howrah (HWH)',
    to: 'New Delhi (NDLS)',
    boardingPoint: 'Howrah (HWH)',
    reservationUpTo: 'New Delhi (NDLS)',
    dateOfJourney: '2023-10-16',
    departureTime: '14:05',
    arrivalTime: '06:10',
    bookingClass: 'SL',
    chartPrepared: false,
    passengers: [
      {
        number: 1,
        bookingStatus: 'WL/12',
        currentStatus: 'WL/8',
      }
    ],
    waitingType: 'GNWL',
    confirmationProbability: 68
  },
  '5678901234': {
    pnrNumber: '5678901234',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    from: 'Mumbai Central (MMCT)',
    to: 'New Delhi (NDLS)',
    boardingPoint: 'Mumbai Central (MMCT)',
    reservationUpTo: 'New Delhi (NDLS)',
    dateOfJourney: '2023-10-18',
    departureTime: '16:35',
    arrivalTime: '08:15',
    bookingClass: '2A',
    chartPrepared: true,
    passengers: [
      {
        number: 1,
        bookingStatus: 'RAC/15',
        currentStatus: 'RAC/8/SL',
        coachNumber: 'B1',
        seatType: 'Side Lower'
      }
    ],
    confirmationProbability: 92
  },
  '1122334455': {
    pnrNumber: '1122334455',
    trainNumber: '12309',
    trainName: 'Rajendra Nagar Rajdhani Express',
    from: 'Rajendra Nagar (RJPB)',
    to: 'New Delhi (NDLS)',
    boardingPoint: 'Rajendra Nagar (RJPB)',
    reservationUpTo: 'New Delhi (NDLS)',
    dateOfJourney: '2023-10-20',
    departureTime: '12:45',
    arrivalTime: '07:30',
    bookingClass: '3A',
    chartPrepared: true,
    passengers: [
      {
        number: 1,
        bookingStatus: 'CNF',
        currentStatus: 'CNF/B3/22/SU',
        coachNumber: 'B3',
        seatNumber: '22',
        seatType: 'Side Upper'
      },
      {
        number: 2,
        bookingStatus: 'RAC/5',
        currentStatus: 'CNF/B3/24/LB',
        coachNumber: 'B3',
        seatNumber: '24',
        seatType: 'Lower Berth'
      },
      {
        number: 3,
        bookingStatus: 'WL/3',
        currentStatus: 'WL/1',
      }
    ],
    waitingType: 'GNWL',
    confirmationProbability: 45
  },
  '9988776655': {
    pnrNumber: '9988776655',
    trainNumber: '12952',
    trainName: 'New Delhi Rajdhani',
    from: 'New Delhi (NDLS)',
    to: 'Mumbai Central (MMCT)',
    boardingPoint: 'New Delhi (NDLS)',
    reservationUpTo: 'Mumbai Central (MMCT)',
    dateOfJourney: '2023-10-25',
    departureTime: '17:15',
    arrivalTime: '09:55',
    bookingClass: '1A',
    chartPrepared: false,
    passengers: [
      {
        number: 1,
        bookingStatus: 'TQWL/8',
        currentStatus: 'TQWL/4',
      }
    ],
    waitingType: 'TQWL',
    confirmationProbability: 35
  },
  '4455667788': {
    pnrNumber: '4455667788',
    trainNumber: '12305',
    trainName: 'Kolkata Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Howrah (HWH)',
    boardingPoint: 'New Delhi (NDLS)',
    reservationUpTo: 'Howrah (HWH)',
    dateOfJourney: '2023-10-30',
    departureTime: '16:55',
    arrivalTime: '09:45',
    bookingClass: '2A',
    chartPrepared: true,
    passengers: [
      {
        number: 1,
        bookingStatus: 'RLWL/6',
        currentStatus: 'RLWL/2',
      }
    ],
    waitingType: 'RLWL',
    confirmationProbability: 25
  },
  '7788990011': {
    pnrNumber: '7788990011',
    trainNumber: '22222',
    trainName: 'INVALID TRAIN',
    from: 'XXX',
    to: 'YYY',
    boardingPoint: 'XXX',
    reservationUpTo: 'YYY',
    dateOfJourney: '2023-11-01',
    departureTime: '00:00',
    arrivalTime: '00:00',
    bookingClass: 'SL',
    chartPrepared: false,
    passengers: [],
    waitingType: 'GNWL',
    confirmationProbability: 0
  }
};
export const getPnrStatus = async (pnrNumber: string): Promise<PNRDetails | null> => {
  // In a real app, this would be an API call
  console.log(`Checking PNR status for: ${pnrNumber}`);
  
  // Using mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      if (pnrNumber === '0000000000') {
        // Simulate invalid PNR
        resolve(null);
      } else if (pnrNumber === '7788990011') {
        // Simulate cancelled train
        const result = { ...mockPnrData[pnrNumber] };
        result.trainName = 'CANCELLED - ' + result.trainName;
        resolve(result);
      } else {
        const result = mockPnrData[pnrNumber] || null;
        resolve(result);
      }
    }, 1500);
  });
};
