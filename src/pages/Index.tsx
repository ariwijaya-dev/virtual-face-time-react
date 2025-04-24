
import React, { useState, useEffect } from 'react';
import VideoGrid from '@/components/VideoGrid';
import Controls from '@/components/Controls';
import PreJoinRoom from '@/components/PreJoinRoom';

const Index = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [mockStreams, setMockStreams] = useState<MediaStream[]>([]);

  const createMockStream = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw a colored background
      ctx.fillStyle = '#2d3748';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some text
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText('Participant', canvas.width / 2 - 50, canvas.height / 2);
    }

    // Create a stream from the canvas
    const stream = canvas.captureStream();
    return stream;
  };

  useEffect(() => {
    if (isJoined) {
      // Create 3 mock streams when joining
      const mockStreamsList = [
        createMockStream(),
        createMockStream(),
        createMockStream(),
      ];
      setMockStreams(mockStreamsList);
    }

    return () => {
      mockStreams.forEach(stream => {
        stream.getTracks().forEach(track => track.stop());
      });
    };
  }, [isJoined]);

  const handleJoinRoom = async (name: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      setIsJoined(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  if (!isJoined) {
    return <PreJoinRoom onJoin={handleJoinRoom} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <VideoGrid streams={mockStreams} localStream={localStream || undefined} />
      <Controls
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        onToggleCamera={toggleCamera}
        onToggleMic={toggleMic}
      />
    </div>
  );
};

export default Index;
