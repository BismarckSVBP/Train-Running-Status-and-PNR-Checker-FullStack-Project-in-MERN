
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import PNRStatusComponent from '@/components/PNRStatus';
import { useSearchParams } from 'react-router-dom';
import {  Info } from "lucide-react";
const PNRStatusPage = () => {
  const [searchParams] = useSearchParams();
  const [pnrParam, setPnrParam] = useState<string | null>(null);

  useEffect(() => {
    // Get PNR from URL parameters if available
    const pnr = searchParams.get('pnr');
    if (pnr) {
      setPnrParam(pnr);
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto space-y-8 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">PNR Status Check</h1>
          <p className="text-muted-foreground">
            Check your PNR status for train bookings and get detailed information about your journey
          </p>
        </div>

        <PNRStatusComponent initialPnr={pnrParam} />
      </div>          
    </Layout>
  );
};

export default PNRStatusPage;
