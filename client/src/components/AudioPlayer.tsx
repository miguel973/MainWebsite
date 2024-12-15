import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          const error = e.currentTarget.error;
          console.error('Audio loading error:', {
            code: error?.code,
            message: error?.message,
            url: audioUrl,
            mediaError: {
              MEDIA_ERR_ABORTED: error?.code === 1,
              MEDIA_ERR_NETWORK: error?.code === 2,
              MEDIA_ERR_DECODE: error?.code === 3,
              MEDIA_ERR_SRC_NOT_SUPPORTED: error?.code === 4
            }
          });
          
          let errorMessage = "Could not load audio file. ";
          if (error?.code === 2) errorMessage += "Network error occurred.";
          else if (error?.code === 3) errorMessage += "Audio format is not supported.";
          else if (error?.code === 4) errorMessage += "Audio source is not supported.";
          
          toast({
            title: "Error Playing Audio",
            description: errorMessage,
            variant: "destructive",
          });
        }}
        preload="auto"
        onLoadedData={() => {
          console.log('Audio loaded successfully:', {
            url: audioUrl,
            element: audioRef.current
          });
        }}
      >
        <source src={audioUrl.replace('.wav', '.mp3')} type="audio/mpeg" />
        <source src={audioUrl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="h-10 w-10"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
