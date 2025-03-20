
export interface Passenger {
  name: string;
  number: number;
  currentStatus: string;
  bookingStatus: string;
  coachNumber?: string;
  seatNumber?: string;
  seatType?: string;
  currentSeatDetails:string;
  berthType:string;
  confirmProb:number;
}


export interface BackendPassenger {
  Passenger: string;
  BookingStatus: string;
  CurrentStatus: string;
}



export interface TrainStation {
  SerialNo: string;
  StationName: string;
  StationCode: string;
  Distance: string;
  IsDeparted: string;
  Day: string;
  ScheduleArrival: string;
  ActualArrival: string;
  DelayInArrival: string;
  ScheduleDeparture: string;
  ActualDeparture: string;
  DelayInDeparture: string;
}



// New interfaces for the updated train status response format
export interface NonStopStation {
  si_no: number;
  station_code: string;
  station_name: string;
  is_diverted_station: boolean;
  distance_from_source: number;
  sta?: string;
  std?: string;
}

export interface HotelData {
  hotel_available: boolean;
  deeplink: string;
  hotel_city_id: number;
  hotel_city_name: string;
}

export interface FoodData {
  food_available: boolean;
  deeplink: string;
  drink_brand_icon: string;
  food_home_page_deeplink?: string;
  title?: string;
  message?: string;
  pantry_message?: string;
  closing_in?: string;
}

export interface StationInfo {
  si_no: number;
  station_code: string;
  station_name: string;
  is_diverted_station: boolean;
  distance_from_source: number;
  distance_from_current_station?: number;
  distance_from_current_station_txt?: string;
  sta: string;
  std: string;
  eta?: string;
  etd?: string;
  halt: number;
  a_day: number;
  a_min?: number;
  arrival_delay: number;
  fog_incidence_probability?: number;
  platform_number: number;
  on_time_rating?: number;
  is_rail_heads?: boolean;
  station_lat?: number;
  station_lng?: number;
  stoppage_number?: number;
  day?: number;
  eta_a_min?: number;
  food_available?: boolean;
  hotel_data?: HotelData;
  food_data?: FoodData;
  non_stops: NonStopStation[];
}

export interface TrainStatusLtsData {
  success: boolean;
  user_id: number;
  train_number: string;
  train_name: string;
  gps_unable: boolean;
  train_start_date: string;
  notification_date: string;
  at_src_dstn: boolean;
  at_src: boolean;
  at_dstn: boolean;
  is_run_day: boolean;
  refresh_interval: number;
  source: string;
  destination: string;
  source_stn_name: string;
  dest_stn_name: string;
  run_days: string;
  journey_time: number;
  std: string;
  fog_incidence_probability: number;
  pantry_available: boolean;
  cur_refresh_interval: number;
  data_from: string;
  halt: number;
  new_alert_id: number;
  new_alert_msg: string;
  diverted_stations: any;
  primary_alert: number;
  instance_alert: number;
  related_alert: number;
  late_update: boolean;
  is_ry_eta: boolean;
  update_time: string;
  is_on_train: boolean;
  on_train_error_msg: string;
  travelling_towards: string;
  distance_from_source: number;
  total_distance: number;
  avg_speed: number;
  a_min: number;
  si_no: number;
  current_station_code: string;
  current_station_name: string;
  status: string;
  eta: string;
  etd: string;
  delay: number;
  ahead_distance: number;
  ahead_distance_text: string;
  status_as_of: string;
  local_address: string;
  platform_number: number;
  cur_stn_sta: string;
  cur_stn_std: string;
  is_possibly_on_train: boolean;
  stoppage_number: number;
  a_day: number;
  status_as_of_min: number;
  dfp_carousel: Record<string, any>;
  upcoming_stations: StationInfo[];
  previous_stations: StationInfo[];
}

export interface NewTrainStatusResponse {
  pageProps: {
    ltsData: TrainStatusLtsData;
  };
}

export interface Train {
  number: string;
  name: string;
  from: string;
  to: string;
  status: "On Time" | "Delayed" | "Departed" | "Arrived" | "Cancelled";
  delayMinutes: number;
  currentStation?: string;
  nextStation?: string;
  startDate: string;
  type: string;
  platform?: string;
}

export interface Station {
  name: string;
  code: string;
  arrivalTime: string;
  departureTime: string;
  platform?: string;
  status: "passed" | "active" | "upcoming";
  distanceFromStart: number;
  delay: number;
}

export interface TrainRoute {
  train: Train;
  stations: Station[];
  travelPercentage: number;
}

export interface RecentSearch {
  trainNumber: string;
  trainName: string;
  searchedAt: Date;
}



export type ThemeMode =
  | "light"
  | "dark"
  | "system"
  | "reading"
  | "high-contrast"
  | "sepia"
  | "night";

// New PNR Status interfaces

export type BookingClass =
  | "SL"
  | "3A"
  | "2A"
  | "1A"
  | "CC"
  | "EC"
  | "2S"
  | "GN";
export interface PNRPassenger {
  name: string;
  currentStatus: string;
  currentSeatDetails: string;
  berthType: string;
  confirmProb: number;
}

export interface BoardingStationData {
  doj: string;
  stnCode: string;
  stnName: string;
  arrTime: string;
  haltMin: number;
  depTime: string;
  pfNo: string;
  lat: number;
  lon: number;
}

export interface BookReturnDate {
  actualDate: string;
}

export interface BookReturn {
  header: string;
  srcCode: string;
  srcName: string;
  dstCode: string;
  dstName: string;
  dates: BookReturnDate[];
  offer: any;
}

export interface DecodeFact {
  imageSrc: string;
  imageText: string;
  imageReadTime: string;
  imageLink: string;
}

export interface PNRDecode {
  heading: string;
  data: DecodeFact[];
}

export interface PNRDetails {
  pnrNo: string;
  overallStatus: string;
  trainNumber: string;
  trainName: string;
  duration: number;
  journeyClass: string;
  journeyClassName: string;
  departureTime: string;
  arrivalTime: string;
  srcName: string;
  dstName: string;
  srcCode: string;
  dstCode: string;
  srcPfNo: string;
  dstPfNo: string;
  chartStatus: string;
  chartPrepMsg: string;
  pnrLastUpdated: string;
  quota: string;
  quotaName: string;
  passengers: PNRPassenger[];
  trainCancelled: string;
  boardingStationData: BoardingStationData;
  sourceDoj: string;
  orderUuid: string;
  itemUuid: string;
  postSalesSG: any;
  bookReturn: BookReturn;
  noteOrCoachPos: string;
  decode: PNRDecode;
  disclaimerMsg: string;
  isSubscribed: boolean;
  faqLinkTxt: string;
  isCoachPosAvl: boolean;
  callLTSAPI: boolean;
  screenNo: number;
  subIds: any;
  deepLink: string;
  risDeepLink: string;
  risWhatsAppText: string;
  isBooker: boolean;
}

export interface PNRErrorResponse {
  errorcode: string;
  errormsg: string;
  detailedmsg: string;
}







//to show dummy coach position data


export interface BackendCoach {
  SerialNo: string;
  Code: string;
  Name: string;
  Number: string;
}

export interface BackendCoachResponse {
  ResponseCode: string;
  TrainNumber: string;
  Coaches: BackendCoach[];
  Status: string;
  LastUpdate: string;
}
