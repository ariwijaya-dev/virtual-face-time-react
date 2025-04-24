
import React, { useState, useEffect } from 'react';
import VideoGrid from '@/components/VideoGrid';
import Controls from '@/components/Controls';
import PreJoinRoom from '@/components/PreJoinRoom';

const Index = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

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
      <VideoGrid streams={[]} localStream={localStream || undefined} />
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
