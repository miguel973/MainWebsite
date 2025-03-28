import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  type: 'youtube' | 'tiktok';
  embedCode: string;
  thumbnailUrl: string;
}

const videoData: VideoItem[] = [
  {
    id: 'youtube-1',
    title: 'Drone Footage',
    type: 'youtube',
    embedCode: 'https://www.youtube.com/embed/WHGMVOq5QG0',
    thumbnailUrl: 'https://img.youtube.com/vi/WHGMVOq5QG0/hqdefault.jpg'
  },
  {
    id: 'tiktok-1',
    title: 'Drone Gang Gang',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/6845102309823892742" data-video-id="6845102309823892742" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Drone Gang Gang 🚁 <a title="hitmeup" target="_blank" href="https://www.tiktok.com/tag/hitmeup?refer=embed">#hitMeUP</a> <a title="drones" target="_blank" href="https://www.tiktok.com/tag/drones?refer=embed">#Drones</a> Hmu in Houston if you need footage 🔥🔥<a title="houston" target="_blank" href="https://www.tiktok.com/tag/houston?refer=embed">#Houston</a> <a title="weflyhigh" target="_blank" href="https://www.tiktok.com/tag/weflyhigh?refer=embed">#weFlyHigh</a> </section> </blockquote>`,
    thumbnailUrl: '/tiktok-thumbnail-1.jpg'
  },
  {
    id: 'tiktok-2',
    title: 'San Antonio Drone',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/6846924698102664454" data-video-id="6846924698102664454" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Quick Dronio in San Antonio 🚁🚁🚁 <a title="drones" target="_blank" href="https://www.tiktok.com/tag/drones?refer=embed">#drones</a> <a title="cono" target="_blank" href="https://www.tiktok.com/tag/cono?refer=embed">#cono</a> </section> </blockquote>`,
    thumbnailUrl: '/tiktok-thumbnail-2.jpg'
  },
  {
    id: 'tiktok-3',
    title: 'Heavenly Vibes',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/7226086306265222443" data-video-id="7226086306265222443" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Heavenly is such a vibe <a title="heaven" target="_blank" href="https://www.tiktok.com/tag/heaven?refer=embed">#heaven</a> <a title="heavenly" target="_blank" href="https://www.tiktok.com/tag/heavenly?refer=embed">#heavenly</a> </section> </blockquote>`,
    thumbnailUrl: '/tiktok-thumbnail-3.jpg'
  }
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Load TikTok embed script when needed
  useEffect(() => {
    if (isOpen && selectedVideo?.type === 'tiktok') {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, selectedVideo]);

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Media Gallery</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoData.map((video) => (
          <div 
            key={video.id} 
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleVideoSelect(video)}
          >
            <div className="relative aspect-video">
              {video.thumbnailUrl === '/tiktok-thumbnail-1.jpg' || video.thumbnailUrl === '/tiktok-thumbnail-2.jpg' ? (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <span className="text-lg font-medium">{video.title}</span>
                </div>
              ) : (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="secondary">
                  Play Video
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{video.title}</h3>
              <p className="text-sm text-muted-foreground">{video.type === 'youtube' ? 'YouTube' : 'TikTok'}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="aspect-video w-full">
            {selectedVideo?.type === 'youtube' ? (
              <iframe
                width="100%"
                height="100%"
                src={`${selectedVideo.embedCode}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: selectedVideo?.embedCode || '' }}
                className="w-full h-full flex items-center justify-center"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}