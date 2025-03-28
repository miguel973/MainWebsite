import React from 'react';
import { motion } from 'framer-motion';
import VideoGallery from '@/components/VideoGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Waves, Plane } from 'lucide-react';

export default function Media() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8 px-4"
    >
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-4">Media & Content</h1>
        <p className="text-muted-foreground text-lg">
          A collection of my adventures captured on video - from aerial drone footage over Houston 
          and San Antonio to underwater explorations in Indonesia's vibrant reefs.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="max-w-6xl mx-auto">
        <TabsList className="mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            All Videos
          </TabsTrigger>
          <TabsTrigger value="drone" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Drone Footage
          </TabsTrigger>
          <TabsTrigger value="underwater" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            Underwater
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <VideoGallery category="all" />
        </TabsContent>
        
        <TabsContent value="drone">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Aerial Photography & Videography</h2>
            <p className="text-muted-foreground">
              Professional drone footage showcasing properties, landscapes, and urban environments across Texas.
              Available for property documentation, real estate marketing, and special events.
            </p>
          </div>
          <VideoGallery category="drone" />
        </TabsContent>
        
        <TabsContent value="underwater">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Underwater Adventures</h2>
            <p className="text-muted-foreground">
              Documenting my scuba diving journeys in beautiful locations around the world,
              from Indonesia's coral reefs to encounters with marine life in crystal-clear waters.
            </p>
          </div>
          <VideoGallery category="underwater" />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}