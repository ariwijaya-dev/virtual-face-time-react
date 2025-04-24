
import React from 'react';
import { Card } from '@/components/ui/card';

interface VideoGridProps {
  streams: MediaStream[];
  localStream?: MediaStream;
}

const VideoGrid = ({ streams, localStream }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {localStream && (
        <Card className="relative overflow-hidden aspect-video bg-gray-900">
          <video
            autoPlay
            muted
            playsInline
            ref={(video) => {
              if (video) video.srcObject = localStream;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
            You
          </div>
        </Card>
      )}
      {streams.map((stream, index) => (
        <Card key={index} className="relative overflow-hidden aspect-video bg-gray-900">
          <video
            autoPlay
            playsInline
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
            className="w-full h-full object-cover"
          />
        </Card>
      ))}
    </div>
  );
};

export default VideoGrid;
