import React from "react";
import Layout from "@/components/Layout";
import CoachLayoutSearch from "@/components/CoachLayoutSearch";
import { Info } from "lucide-react";
const CoachLayoutPage = () => {
  return (
    <Layout>
    
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Coach Layout</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto pb-6">
          View the seating arrangement of your coach and get a better idea of
          your seat location. Enter your train and coach details to visualize
          the layout.
        </p>
        <CoachLayoutSearch />
      </div>
      <div className="mt-60 mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-5xl mx-auto">
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
                This Coach Layout Check page is currently under development, but
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

export default CoachLayoutPage;
