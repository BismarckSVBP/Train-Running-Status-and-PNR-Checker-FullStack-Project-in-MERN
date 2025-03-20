
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { ThemeMode } from '@/lib/types';
import { toast } from 'sonner';
import { SunIcon, MoonIcon, MonitorIcon, BookOpenIcon, EyeIcon, PaletteIcon, MoonStarIcon } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: ThemeMode) => {
    setTheme(value);
    toast.success(`Theme changed to ${value} mode`);
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto space-y-8 py-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your experience with Train Tracker
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how Train Tracker looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={theme}
              onValueChange={(value) => handleThemeChange(value as ThemeMode)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <SunIcon className="mb-3 h-6 w-6 text-orange-500" />
                <span className="text-sm font-medium">Light</span>
                <span className="text-xs text-muted-foreground mt-1">Default bright theme</span>
              </Label>
              
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <MoonIcon className="mb-3 h-6 w-6 text-indigo-500" />
                <span className="text-sm font-medium">Dark</span>
                <span className="text-xs text-muted-foreground mt-1">Easier on the eyes</span>
              </Label>
              
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <MonitorIcon className="mb-3 h-6 w-6 text-blue-500" />
                <span className="text-sm font-medium">System</span>
                <span className="text-xs text-muted-foreground mt-1">Matches your device</span>
              </Label>
              
              <Label
                htmlFor="reading"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="reading" id="reading" className="sr-only" />
                <BookOpenIcon className="mb-3 h-6 w-6 text-amber-500" />
                <span className="text-sm font-medium">Reading</span>
                <span className="text-xs text-muted-foreground mt-1">Comfortable for text</span>
              </Label>
              
              <Label
                htmlFor="high-contrast"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="high-contrast" id="high-contrast" className="sr-only" />
                <EyeIcon className="mb-3 h-6 w-6 text-purple-500" />
                <span className="text-sm font-medium">High Contrast</span>
                <span className="text-xs text-muted-foreground mt-1">Better accessibility</span>
              </Label>
              
              <Label
                htmlFor="sepia"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="sepia" id="sepia" className="sr-only" />
                <PaletteIcon className="mb-3 h-6 w-6 text-yellow-700" />
                <span className="text-sm font-medium">Sepia</span>
                <span className="text-xs text-muted-foreground mt-1">Warm paper-like tone</span>
              </Label>
              
              <Label
                htmlFor="night"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="night" id="night" className="sr-only" />
                <MoonStarIcon className="mb-3 h-6 w-6 text-indigo-400" />
                <span className="text-sm font-medium">Night</span>
                <span className="text-xs text-muted-foreground mt-1">Ultra dark for nighttime</span>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
