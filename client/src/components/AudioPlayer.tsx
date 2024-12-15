import { useState, useRef, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Cleanup effect
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || isLoading) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Show loading state while we wait for play to start
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true);
            })
            .catch((error) => {
              // Auto-play was prevented or another error occurred
              setIsPlaying(false);
              console.error('Error starting playback:', error);
              toast({
                title: "Playback Error",
                description: error.message || "There was an error starting playback. Please try again.",
                variant: "destructive",
              });
            });
        }
      }
    } catch (error) {
      console.error('Error in play/pause operation:', error);
      setIsPlaying(false);
      toast({
        title: "Playback Error",
        description: "There was an error controlling playback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current || isLoading) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current || isLoading) return;
    const time = (value[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(value[0]);
  };

  // Handle loading state and cleanup when audio source changes
  useEffect(() => {
    let currentAudio = audioRef.current;
    
    // Reset states when audio source changes
    setIsLoading(true);
    setIsPlaying(false);
    setProgress(0);
    
    if (currentAudio) {
      // Cleanup existing audio element
      const playPromise = currentAudio.play && currentAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => currentAudio.pause())
          .catch(() => {/* Ignore any play/pause errors during cleanup */});
      } else {
        currentAudio.pause();
      }
      currentAudio.currentTime = 0;
    }

    // Cleanup function
    return () => {
      if (currentAudio) {
        const playPromise = currentAudio.play && currentAudio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => currentAudio.pause())
            .catch(() => {/* Ignore any play/pause errors during cleanup */});
        } else {
          currentAudio.pause();
        }
        currentAudio.currentTime = 0;
      }
    };
  }, [audioUrl]);

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
          
          setIsLoading(false);
          setIsPlaying(false);
          
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
          setIsLoading(false);
        }}
        onLoadStart={() => setIsLoading(true)}
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
          disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          disabled={isLoading}
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
