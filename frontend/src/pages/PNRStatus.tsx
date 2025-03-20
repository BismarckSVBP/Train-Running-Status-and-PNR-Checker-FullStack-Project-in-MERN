
// import React, { useEffect, useState } from 'react';
// import Layout from '@/components/Layout';
// import PNRStatusComponent from '@/components/PNRStatus';
// import { useSearchParams } from 'react-router-dom';
// import {  Info } from "lucide-react";
// const PNRStatusPage = () => {
//   const [searchParams] = useSearchParams();
//   const [pnrParam, setPnrParam] = useState<string | null>(null);

//   useEffect(() => {
//     // Get PNR from URL parameters if available
//     const pnr = searchParams.get('pnr');
//     if (pnr) {
//       setPnrParam(pnr);
//     }
//   }, [searchParams]);

//   return (
//     <Layout>
//       <div className="container max-w-4xl mx-auto space-y-8 py-6">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">PNR Status Check</h1>
//           <p className="text-muted-foreground">
//             Check your PNR status for train bookings and get detailed information about your journey
//           </p>
//         </div>

//         <PNRStatusComponent initialPnr={pnrParam} />
//       </div>          
//     </Layout>
//   );
// };

// export default PNRStatusPage;






//to show dummy data now 



import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PNRStatusComponent from "@/components/PNRStatus";
import { useSearchParams } from "react-router-dom";
import { Info } from "lucide-react";
const PNRStatusPage = () => {
  const [searchParams] = useSearchParams();
  const [pnrParam, setPnrParam] = useState<string | null>(null);

  useEffect(() => {
    // Get PNR from URL parameters if available
    const pnr = searchParams.get("pnr");
    if (pnr) {
      setPnrParam(pnr);
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto space-y-8 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            PNR Status Check
          </h1>
          <p className="text-muted-foreground">
            Check your PNR status for train bookings and get detailed
            information about your journey
          </p>
        </div>
        <PNRStatusComponent initialPnr={pnrParam} />
      </div>
      <div className="mt-40 mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-5xl mx-auto">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Development Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              <p>
                This PNR Status Check page is currently under development, but
                you can use the given mock data to see how it will look after
                the development is completed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PNRStatusPage;
