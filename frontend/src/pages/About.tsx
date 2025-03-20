import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          About The Developer
        </h1>
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src="/picture2.jpg"
                    alt="Abhay's Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Abhay Kumar Kasaudhan
                </h3>
                <p className="text-muted-foreground mb-2">
                  CSE B.Tech 2nd year student
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Backend Developer and Coder</p>
                  <p className="mb-2 inline-flex items-center gap-2">
                    <a
                      href="https://www.linkedin.com/in/abhay-kumar-kasaudhan-4aa26b282/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <LinkIcon className="h-4 w-4 inline" /> LinkedIn Profile
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-4/5 mx-auto max-w-screen-lg">
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Why Choose Train Tracker?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-primary/10 inline-flex p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"></path>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get accurate, up-to-the-minute information about your train's
                  location and status.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-primary/10 inline-flex p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <h3 className="font-medium">PNR Status(Under-Development)</h3>
                <p className="text-sm text-muted-foreground">
                  Check your PNR status instantly and get detailed information
                  about your booking.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-primary/10 inline-flex p-3 rounded-full mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <rect width="18" height="10" x="3" y="11" rx="2"></rect>
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M12 7v4"></path>
                    <line x1="8" x2="8" y1="16" y2="16"></line>
                    <line x1="16" x2="16" y1="16" y2="16"></line>
                  </svg>
                </div>
                <h3 className="font-medium">Coach Layout(Under-Development)</h3>
                <p className="text-sm text-muted-foreground">
                  View detailed coach arrangements and seat availability for
                  better journey planning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

       

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking to improve our service. If you have any
            questions, suggestions, or feedback, please don't hesitate to
            contact us.
          </p>
          <a
            href="/contact-us"
            className="text-primary font-medium hover:underline"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
