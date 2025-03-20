import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

import { API_BASE_URL } from "@/config"; // ✅ Use config.ts

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContactFormData {
  name: string;
  email: string;
  query: string;
}

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.query) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would send to your backend
      const response = await fetch(
        `${API_BASE_URL}contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            message: formData.query,
          }),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");

        setFormData({
          name: "",
          email: "",
          query: "",
        });
        navigate("/");
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            Contact Us
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Have a question or feedback? We'd love to hear from you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="query">Your Message</Label>
                <Textarea
                  id="query"
                  name="query"
                  placeholder="How can we help you?"
                  value={formData.query}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
            </div>

            <CardFooter className="flex justify-end pt-4 px-0">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
