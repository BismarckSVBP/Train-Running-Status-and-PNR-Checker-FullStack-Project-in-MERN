
import React, { useState } from 'react';
import { getCoachArrangement } from '@/lib/api';
import { toast } from 'sonner';
import SearchBarCoachLayout from './SearchBarCoachLayout';
import CoachLayoutDisplay from './CoachLayoutDisplay';

const CoachLayoutSearch = () => {
  const [loading, setLoading] = useState(false);
  const [coachData, setCoachData] = useState(null);

  const handleSearch = async (trainNumber: string) => {
    try {
      setLoading(true);
      const data = await getCoachArrangement(trainNumber);
      setCoachData(data);
    } catch (error) {
      console.error('Error fetching coach layout:', error);
      toast.error('Failed to fetch coach layout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <SearchBarCoachLayout onSearch={handleSearch} isLoading={loading} />
      {coachData && <CoachLayoutDisplay coaches={coachData} />}
    </div>
  );
};

export default CoachLayoutSearch;