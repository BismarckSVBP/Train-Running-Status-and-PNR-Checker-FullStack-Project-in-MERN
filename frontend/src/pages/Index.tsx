

// export default Index;
import React, { useState } from "react";
import { toast } from "sonner";
import { Train as TrainIcon, Info } from "lucide-react";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import TrainStatus from "@/components/TrainStatus";
import TrainRoute from "@/components/TrainRoute";
// import CoachArrangement from "@/components/CoachArrangement";
import RecentSearches from "@/components/RecentSearches";

import {
  searchTrain,
  getTrainRoute,
  getRecentSearches,
  clearRecentSearches,
  TrainDataFromBackend,
} from "@/lib/api";
import { Train, TrainRoute as TrainRouteType, RecentSearch } from "@/lib/types";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [train, setTrain] = useState<Train | null>(null);
  const [route, setRoute] = useState<TrainRouteType | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(
    getRecentSearches()
  );

  
  const handleSearch = async (trainNumber: string, date?: Date) => {
    setIsLoading(true);
  
    try {
      const response = await TrainDataFromBackend(trainNumber, date);
  
     // console.log("Response from TrainDataFromBackend:", response);
  
      // Check if response or data is null before proceeding
      if (!response || !response.data) {
        console.error("Invalid response format:", response);
        toast.error("No data received from the backend.");
        return;
      }
  
      const train = await searchTrain(response);
  
      if (!train) {
        toast.error("Train not found. Please check the train number and try again.");
        return;
      }
  
      setTrain(train);
  
      const route = await getTrainRoute(response);
      setRoute(route?.stations ? route : null);
  
      // Refresh recent searches
      setRecentSearches(getRecentSearches());
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to fetch train information. The Train Number is not found in the Server's Database. Please inform the Admin to update their Database with this Train Number if it exists.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <TrainIcon className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Real-Time India Train Tracker
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get live updates on train location, arrival times, and platform details for any train in India. Enter a train number and select a date to get started.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {!train && !isLoading && (
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSearch}
            onClear={handleClearRecentSearches}
          />
        )}

        {train && <TrainStatus train={train} />}

        {/* {coaches && train && <CoachArrangement train={train} coaches={coaches} />} */}

        {route && <TrainRoute route={route} />}

        {isLoading && (
          <div className="flex items-center justify-center mt-12">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <TrainIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
