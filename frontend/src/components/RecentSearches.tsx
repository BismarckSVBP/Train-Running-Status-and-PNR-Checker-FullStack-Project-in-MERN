
import React from 'react';
import { History, X, Clock, ChevronRight } from 'lucide-react';
import { RecentSearch } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (trainNumber: string) => void;
  onClear: () => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect, onClear }) => {
  if (searches.length === 0) return null;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 opacity-0 animate-slide-in stagger-2">
      <Card className="glass-panel overflow-hidden shadow-elevation-1">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <History className="h-5 w-5 text-muted-foreground mr-2" />
              <h3 className="text-lg font-medium">Recent Searches</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
          
          <div className="space-y-1">
            {searches.map((search) => (
              <button
                key={search.trainNumber}
                onClick={() => onSelect(search.trainNumber)}
                className="w-full text-left p-3 rounded-md hover:bg-secondary/50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {search.trainNumber.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{search.trainName}</p>
                    <p className="text-sm text-muted-foreground">#{search.trainNumber}</p>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">{formatTime(search.searchedAt)}</span>
                  <ChevronRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecentSearches;




