import React from 'react';
import VideoGallery from '@/components/VideoGallery';

export default function Media() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Media</h1>
      <p className="text-muted-foreground mb-8">
        Explore my drone footage videos and social media content.
      </p>
      
      <VideoGallery />
    </div>
  );
}