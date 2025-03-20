

import React, { useMemo } from "react";
import { Clock, Train as TrainIcon, MapPin } from "lucide-react";
import { TrainRoute as TrainRouteType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TrainRouteProps {
  route: TrainRouteType;
}

const TrainRoute: React.FC<TrainRouteProps> = ({ route }) => {
  const { train, stations, travelPercentage } = route;

  // Find the active station
  const activeStationIndex = useMemo(() => {
    return stations.findIndex((station) => station.status === "active");
  }, [stations]);

  // Calculate next station (if active is not the last)
  const nextStationIndex =
    activeStationIndex < stations.length - 1 ? activeStationIndex + 1 : -1;

  // Get status text based on train status and delay
  const getStatusText = () => {
    if (train.status === "Delayed" && train.delayMinutes > 0) {
      return `Delayed by ${train.delayMinutes} min`;
    } else if (train.status === "On Time") {
      return "Running on time";
    }
    return train.status;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 opacity-0 animate-slide-in stagger-1">
      <Card className="glass-panel overflow-hidden shadow-elevation-2">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <TrainIcon className="h-5 w-5 mr-2 text-train-primary" />
              Journey Progress
            </h3>

            <div className="flex flex-wrap gap-2">
              {activeStationIndex >= 0 && (
                <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-train-primary/10 rounded-full text-train-primary">
                  <div className="live-indicator"></div>
                  <span>Currently at {stations[activeStationIndex].name}</span>
                </div>
              )}

              <div
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full ${
                  train.status === "Delayed"
                    ? "bg-train-delayed/10 text-train-delayed"
                    : "bg-green-500/10 text-green-600"
                }`}
              >
                <span>{getStatusText()}</span>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>
                {stations[0]?.name} ({stations[0]?.code})
              </span>
              <span>
                {stations[stations.length - 1]?.name} (
                {stations[stations.length - 1]?.code})
              </span>
            </div>

            <div className="relative">
              <Progress
                value={travelPercentage}
                className="h-4 bg-gray-100 dark:bg-gray-800"
              />
              <div
                className="absolute top-0 left-0 flex items-center justify-center h-4"
                style={{
                  left: `${travelPercentage}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-7 w-7 bg-white dark:bg-gray-900 border-2 border-train-primary rounded-full flex items-center justify-center shadow-md">
                  <TrainIcon className="h-4 w-4 text-train-primary" />
                </div>
              </div>
            </div>

            {activeStationIndex >= 0 && nextStationIndex >= 0 && (
              <div className="flex justify-between text-xs mt-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-medium">
                    {stations[activeStationIndex].name}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-muted-foreground">Next</span>
                  <span className="font-medium">
                    {stations[nextStationIndex].name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Stations list */}
          <div className="space-y-0 relative">
            {/* Route line background */}
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 dark:bg-gray-700" />

            {stations.map((station, index) => {
              const isActive = station.status === "active";
              const isPassed = station.status === "passed";
              const isLast = index === stations.length - 1;
              const delayMinutes = station.delay > 0 ? station.delay : 0;

              return (
                <div
                  key={station.code}
                  className={`relative pl-16 pr-2 sm:pr-6 py-4 ${
                    isActive
                      ? "bg-train-primary/5 -mx-4 sm:-mx-6 px-[calc(1rem+1rem)] sm:px-[calc(1.5rem+1.5rem)] rounded-lg"
                      : ""
                  }`}
                >
                  {/* Station indicator dot */}
                  <div className="absolute left-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        isActive
                          ? "bg-train-primary border-train-primary/30"
                          : isPassed
                          ? "bg-train-secondary border-train-secondary/30"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      }`}
                    />
                  </div>

                  {/* Line showing progress */}
                  {isPassed && !isLast && (
                    <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-train-secondary transform -translate-x-1/2" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h4 className="text-base font-semibold">
                          {station.name}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          ({station.code})
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-train-primary/10 text-train-primary">
                            Current
                          </span>
                        )}
                      </div>
                      {station.platform && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Platform: {station.platform}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1 hidden sm:block" />
                        <div className="text-xs sm:text-sm">
                          <span className="text-muted-foreground mr-1 sm:hidden">
                            Arr:
                          </span>
                          <span className="font-medium whitespace-nowrap">
                            {station.arrivalTime}
                          </span>
                        </div>
                      </div>

                      {station.departureTime !== "-" && (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1 hidden sm:block" />
                          <div className="text-xs sm:text-sm">
                            <span className="text-muted-foreground mr-1 sm:hidden">
                              Dep:
                            </span>
                            <span className="font-medium whitespace-nowrap">
                              {station.departureTime}
                            </span>
                          </div>
                        </div>
                      )}

                      {delayMinutes > 0 && (
                        <span className="text-xs sm:text-sm text-train-delayed whitespace-nowrap">
                          +{delayMinutes} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrainRoute;

