
import React from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRecentSearches, clearRecentSearches } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Clock, Train, TicketIcon, Trash2 } from 'lucide-react';
import { RecentSearch } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const History = () => {
  const navigate = useNavigate();
  const [searches, setSearches] = React.useState<RecentSearch[]>([]);

  React.useEffect(() => {
    // Load recent searches on component mount
    setSearches(getRecentSearches());
  }, []);

  const handleClearHistory = () => {
    clearRecentSearches();
    setSearches([]);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const navigateToPNR = (pnr: string) => {
    navigate(`/pnr-status?pnr=${pnr}`);
  };

  const navigateToTrain = (trainNumber: string) => {
    navigate(`/?train=${trainNumber}`);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto space-y-8 py-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Search History</h1>
            <p className="text-muted-foreground">
              View and manage your recent train and PNR searches
            </p>
          </div>
          
          {searches.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={handleClearHistory}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {searches.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Search History</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your recent train and PNR searches will appear here. Try searching for a train or checking a PNR status.
            </p>
          </Card>
        ) : (
          <Card>
            <Table>
              <TableCaption className='mb-4'>A list of your recent searches.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searches.map((search, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Train className="h-3 w-3" />
                        Train
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{search.trainName}</div>
                      <div className="text-sm text-muted-foreground">#{search.trainNumber}</div>
                    </TableCell>
                    <TableCell>{formatDate(search.searchedAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => navigateToTrain(search.trainNumber)}
                      >
                        Search Again
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default History;
