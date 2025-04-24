import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRoomById } from '@/data/mockRooms';
import VideoGrid from '@/components/VideoGrid';
import Controls from '@/components/Controls';
import PreJoinRoom from '@/components/PreJoinRoom';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isJoined, setIsJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [mockStreams, setMockStreams] = useState<MediaStream[]>([]);

  const room = getRoomById(roomId || '');

  // If room doesn't exist, redirect to home
  if (!room) {
    return <Navigate to="/" replace />;
  }

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

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Join Room: {room.name}</h1>
        </div>
        <PreJoinRoom onJoin={handleJoinRoom} />
      </div>
    );
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

export default Room;
