import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  Settings,
  Search,
  Train,
  TramFront,
  History,
  Info,
  MailIcon,
} from "lucide-react";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { useTheme } from "@/hooks/use-theme";

interface LayoutProps {
  children: React.ReactNode;
}

const routes = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
    color: "text-sky-500",
  },
  {
    href: "/pnr-status",
    label: "PNR Status",
    icon: Search,
    color: "text-violet-500",
  },
  {
    href: '/coach-layout',
    label: 'Coach-layout',
    icon: TramFront,
    color: 'text-indigo-500',
  },
  {
    href: "/history",
    label: "History",
    icon: History,
    color: "text-amber-500",
  },
  {
    href: "/about",
    label: "About",
    icon: Info,
    color: "text-green-500",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    icon: MailIcon,
    color: "text-pink-500",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    color: "text-gray-500",
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 w-full border-b px-4 flex items-center justify-between gap-x-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-x-2">
            <Train className="h-6 w-6 text-primary" />
            <span className="font-semibold hidden md:block">Train Tracker</span>
          </Link>
          {theme === "reading" && (
            <Badge className="ml-4 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors">
              Reading Mode
            </Badge>
          )}
        </div>
        <nav className="hidden md:flex items-center gap-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={`flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <route.icon className={`h-4 w-4 ${route.color}`} />
              {route.label}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <Link to="/" className="flex items-center gap-x-2 mb-6">
              <Train className="h-6 w-6 text-primary" />
              <span className="font-semibold">Train Tracker</span>
            </Link>
            <nav className="flex flex-col gap-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === route.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <route.icon className={`h-5 w-5 ${route.color}`} />
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex-1 overflow-auto bg-secondary/10 mt-10">{children}</div>
      <footer className="border-t p-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Train Tracker. All rights
            reserved.
          </p>
          {/* <div className="flex items-center gap-x-4">
            <Link
              to="/about"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link> */}
            {/* <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link> */}
          {/* </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
