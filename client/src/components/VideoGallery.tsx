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
  category: 'drone' | 'underwater' | 'snowboarding' | 'other';
}

const videoData: VideoItem[] = [
  {
    id: 'youtube-1',
    title: 'Texas and Cali Drone Footage',
    type: 'youtube',
    embedCode: 'https://www.youtube.com/embed/WHGMVOq5QG0',
    thumbnailUrl: 'https://placehold.co/600x400/orange/white?text=Texas+and+Cali+Drone',
    category: 'drone'
  },
  {
    id: 'tiktok-1',
    title: 'Houston Drone Footage',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/6845102309823892742" data-video-id="6845102309823892742" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Drone Gang Gang 🚁 <a title="hitmeup" target="_blank" href="https://www.tiktok.com/tag/hitmeup?refer=embed">#hitMeUP</a> <a title="drones" target="_blank" href="https://www.tiktok.com/tag/drones?refer=embed">#Drones</a> Hmu in Houston if you need footage 🔥🔥<a title="houston" target="_blank" href="https://www.tiktok.com/tag/houston?refer=embed">#Houston</a> <a title="weflyhigh" target="_blank" href="https://www.tiktok.com/tag/weflyhigh?refer=embed">#weFlyHigh</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/red/white?text=Houston+Drone+Footage',
    category: 'drone'
  },
  {
    id: 'tiktok-2',
    title: 'Aerial City Views',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/6846924698102664454" data-video-id="6846924698102664454" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Quick Dronio in San Antonio 🚁🚁🚁 <a title="drones" target="_blank" href="https://www.tiktok.com/tag/drones?refer=embed">#drones</a> <a title="cono" target="_blank" href="https://www.tiktok.com/tag/cono?refer=embed">#cono</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/purple/white?text=Aerial+City+Views',
    category: 'drone'
  },
  {
    id: 'tiktok-3',
    title: 'Snowboarding at Lake Tahoe',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/7226086306265222443" data-video-id="7226086306265222443" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Heavenly is such a vibe <a title="heaven" target="_blank" href="https://www.tiktok.com/tag/heaven?refer=embed">#heaven</a> <a title="heavenly" target="_blank" href="https://www.tiktok.com/tag/heavenly?refer=embed">#heavenly</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/87CEEB/white?text=Snowboarding+Tahoe',
    category: 'snowboarding'
  },
  {
    id: 'tiktok-4',
    title: 'Underwater Adventure in Seattle',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/7315449074306518314" data-video-id="7315449074306518314" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/006994/white?text=Seattle+Underwater',
    category: 'underwater'
  },
  {
    id: 'tiktok-5',
    title: 'Scuba Diving in Seattle',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/7315856719307902250" data-video-id="7315856719307902250" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> 🐟 <a title="scuba" target="_blank" href="https://www.tiktok.com/tag/scuba?refer=embed">#scuba</a> <a title="scubadiving" target="_blank" href="https://www.tiktok.com/tag/scubadiving?refer=embed">#scubadiving</a> <a title="scubatiktok" target="_blank" href="https://www.tiktok.com/tag/scubatiktok?refer=embed">#scubatiktok</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/00CED1/white?text=Seattle+Scuba+Diving',
    category: 'underwater'
  },
  {
    id: 'tiktok-6',
    title: 'Summer in Indonesia',
    type: 'tiktok',
    embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@miggysaidwhat/video/7412399199070866719" data-video-id="7412399199070866719" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@miggysaidwhat" href="https://www.tiktok.com/@miggysaidwhat?refer=embed">@miggysaidwhat</a> Summer was epic ☀️ <a title="komodo" target="_blank" href="https://www.tiktok.com/tag/komodo?refer=embed">#komodo</a> <a title="diving" target="_blank" href="https://www.tiktok.com/tag/diving?refer=embed">#diving</a> <a title="livaboard" target="_blank" href="https://www.tiktok.com/tag/livaboard?refer=embed">#livaboard</a> <a title="indonesia" target="_blank" href="https://www.tiktok.com/tag/indonesia?refer=embed">#indonesia</a> <a title="ikanbiru" target="_blank" href="https://www.tiktok.com/tag/ikanbiru?refer=embed">#ikanbiru</a> <a title="shark" target="_blank" href="https://www.tiktok.com/tag/shark?refer=embed">#shark</a> <a title="turtle" target="_blank" href="https://www.tiktok.com/tag/turtle?refer=embed">#turtle</a> <a title="driftdiving" target="_blank" href="https://www.tiktok.com/tag/driftdiving?refer=embed">#driftdiving</a> <a title="flores" target="_blank" href="https://www.tiktok.com/tag/flores?refer=embed">#flores</a> </section> </blockquote>`,
    thumbnailUrl: 'https://placehold.co/600x400/00BFFF/white?text=Crystal+Waters+Indonesia',
    category: 'underwater'
  }
];

interface VideoGalleryProps {
  category?: 'drone' | 'underwater' | 'snowboarding' | 'all';
}

export default function VideoGallery({ category = 'all' }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filter videos based on category
  const filteredVideos = React.useMemo(() => {
    if (category === 'all') {
      return videoData;
    }
    return videoData.filter(video => video.category === category);
  }, [category]);

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
      {category === 'all' && <h2 className="text-2xl font-bold mb-6">Media Gallery</h2>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleVideoSelect(video)}
          >
            <div className="relative aspect-video">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
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