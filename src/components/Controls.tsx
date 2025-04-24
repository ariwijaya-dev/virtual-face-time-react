
import React from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface ControlsProps {
  isCameraOn: boolean;
  isMicOn: boolean;
  onToggleCamera: () => void;
  onToggleMic: () => void;
}

const Controls = ({ isCameraOn, isMicOn, onToggleCamera, onToggleMic }: ControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/95 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleCamera}
        className={isCameraOn ? 'bg-gray-700' : 'bg-red-600 hover:bg-red-700'}
      >
        {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleMic}
        className={isMicOn ? 'bg-gray-700' : 'bg-red-600 hover:bg-red-700'}
      >
        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default Controls;
