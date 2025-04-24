
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { mockRooms, createRoom } from '@/data/mockRooms';

const Admin = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState(mockRooms);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      const newRoom = createRoom(roomName.trim());
      setRooms([...rooms]);
      setRoomName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Meeting Rooms Admin</h1>
        
        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleCreateRoom}>Create Room</Button>
        </div>

        <div className="grid gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-gray-500">Created: {new Date(room.createdAt).toLocaleString()}</p>
                </div>
                <Button
                  onClick={() => {
                    // Copy join URL to clipboard
                    const url = `${window.location.origin}/room/${room.id}`;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  Copy Join URL
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
