
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="glass-panel max-w-md w-full p-8 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg" className="bg-train-primary hover:bg-train-tertiary">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
