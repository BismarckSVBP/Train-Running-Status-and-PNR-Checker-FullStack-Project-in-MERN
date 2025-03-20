
import React from "react";
import {
  Train as TrainIcon,
  Clock,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { Train } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface TrainStatusProps {
  train: Train;
}

const TrainStatus: React.FC<TrainStatusProps> = ({ train }) => {
  const getStatusColor = () => {
    if (train.status === "On Time") return "text-train-on-time";
    if (train.status === "Delayed") return "text-train-delayed";
    if (train.status === "Cancelled") return "text-train-danger";
    return "text-train-accent";
  };

  const getBackgroundClass = () => {
    if (train.status === "On Time") return "bg-train-on-time/10";
    if (train.status === "Delayed") return "bg-train-delayed/10";
    if (train.status === "Cancelled") return "bg-train-danger/10";
    return "bg-train-accent/10";
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 opacity-0 animate-slide-in">
      <Card className="glass-panel overflow-hidden shadow-elevation-2">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${getBackgroundClass()} mr-4`}>
                <TrainIcon className={`h-6 w-6 ${getStatusColor()}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{train.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {train.number} • {train.type}
                </p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full ${getBackgroundClass()} ${getStatusColor()} text-sm font-medium`}
            >
              {train.status}
              {train.delayMinutes > 0 && ` (${train.delayMinutes} min)`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-train-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{train.from}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-train-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{train.to}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{train.startDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {train.currentStation && (
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="live-indicator" />
                    <MapPin className="h-5 w-5 text-train-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Station
                    </p>
                    <p className="font-medium">{train.currentStation==="Unknown" ?"Train not started yet.":train.currentStation}</p>
                  </div>
                </div>
              )}

              {train.nextStation && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-train-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Next Station
                    </p>
                    <p className="font-medium">{train.nextStation}</p>
                  </div>
                </div>
              )}

              {train.platform && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Platform</p>
                    <p className="font-medium"> {Number(train.platform) === 0 ? "The train does not halt at this current station." : train.platform}</p>
                  </div>
                </div>
              )}

              {train.delayMinutes > 0 && (
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-train-delayed" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Delay Information
                    </p>
                    <p className="font-medium">
                      Delayed by {train.delayMinutes} minutes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrainStatus;



