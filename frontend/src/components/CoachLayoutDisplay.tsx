
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrainFront } from 'lucide-react';

interface Coach {
  id: string;
  type: string;
  totalSeats: number;
  availableSeats?: number;
  position: number;
}

interface CoachLayoutDisplayProps {
  coaches: Coach[];
}

const CoachLayoutDisplay: React.FC<CoachLayoutDisplayProps> = ({ coaches }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-full bg-primary/10 mr-4">
            <TrainFront className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Coach Arrangement</h2>
        </div>

        <div className="relative pb-6 mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max p-2">
            {/* Engine */}
            <div className="flex-shrink-0 w-20 h-16 bg-gray-700 dark:bg-gray-600 text-white rounded-r-xl flex items-center justify-center relative">
              <TrainFront className="h-8 w-8" />
              <div className="absolute -bottom-6 w-full text-center text-xs text-muted-foreground">Engine</div>
            </div>
            
            {/* Coaches */}
            {coaches.map((coach) => (
              <div 
                key={coach.id}
                className="flex-shrink-0 w-20 h-16 bg-primary/80 text-white rounded-sm flex flex-col items-center justify-center relative"
              >
                <div className="font-bold">{coach.id}</div>
                <div className="text-xs">{coach.type.split(' ')[0]}</div>
                <div className="absolute -bottom-6 w-full text-center text-xs text-muted-foreground">
                  {coach.totalSeats} seats
                </div>
              </div>
            ))}
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {coaches.map((coach) => (
            <div 
              key={coach.id}
              className="p-3 border rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{coach.id}</span>
                <span className="text-xs text-muted-foreground">{coach.type.split(' ')[0]}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-muted-foreground">Total: {coach.totalSeats}</span>
                {coach.availableSeats !== undefined && (
                  <span className="text-muted-foreground ml-2">Available: {coach.availableSeats}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachLayoutDisplay;