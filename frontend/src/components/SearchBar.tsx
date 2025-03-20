






import React, { useState } from "react";
import { Search, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, subDays, isSameDay } from "date-fns";

interface SearchBarProps {
  onSearch: (trainNumber: string, date?: Date) => Promise<void>;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const dayBeforeYesterday = subDays(today, 2);
  const allowedDates = [today, yesterday, dayBeforeYesterday];

  const [trainNumber, setTrainNumber] = useState("");
  const [date, setDate] = useState<Date | undefined>(today);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Track calendar state

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && allowedDates.some((d) => isSameDay(d, selectedDate))) {
      setDate(selectedDate);
      setIsCalendarOpen(false); // ✅ Close the calendar after selecting a date
    } else {
      toast.error("Please select today, yesterday, or the day before yesterday.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber.trim()) {
      toast.error("Please enter a train number");
      return;
    }
    try {
      await onSearch(trainNumber.trim(), date);
    } catch (error) {
      toast.error("Failed to search train. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center p-2 gap-2 md:gap-3"
        >
          {/* Train Number Input */}
          <div className="relative flex-grow w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              placeholder="Enter train number (e.g. 12301)"
              className="block w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Date Picker */}
          <div className="w-full md:w-auto">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-auto justify-start text-left font-normal flex items-center"
                  disabled={isLoading}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(day) => !allowedDates.some((d) => isSameDay(d, day))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-train-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-train-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 flex justify-center items-center"
            disabled={isLoading || !trainNumber.trim()}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

