
import React, { useState } from 'react';
import { Search, Loader2, Calendar } from 'lucide-react';
import { toast } from "sonner";
interface SearchBarCoachLayoutProps {
  onSearch: (trainNumber: string) => Promise<void>;
  isLoading: boolean;
}

const SearchBarCoachLayout: React.FC<SearchBarCoachLayoutProps> = ({ onSearch, isLoading }) => {
  const [trainNumber, setTrainNumber] = useState('');
 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainNumber.trim()) {
      toast.error('Please enter a train number');
      return;
    }
    if (trainNumber.length!==5) {
      toast.error("Train Number does not contains 5 number");
      return;
    }
    try {
      await onSearch(trainNumber.trim());
    } catch (error) {
      toast.error('Failed to search train. Please try again.');
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-panel overflow-hidden shadow-elevation-2 transition-all duration-300 hover:shadow-elevation-3">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center p-2">
          <div className="relative flex-grow w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              placeholder="Enter train number (e.g. 12301)"
              className="block w-full pl-10 pr-4 py-3 bg-transparent border-none rounded-l-lg focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-train-primary text-white px-6 py-3 rounded-r-lg font-medium hover:bg-train-tertiary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 flex justify-center items-center"
            disabled={isLoading || !trainNumber.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBarCoachLayout;
