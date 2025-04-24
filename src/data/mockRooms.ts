
import { Room } from '@/types/room';

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Team Meeting",
    createdBy: "admin@example.com",
    createdAt: "2024-04-24T10:00:00Z",
  },
  {
    id: "room-2",
    name: "Project Review",
    createdBy: "admin@example.com",
    createdAt: "2024-04-24T11:00:00Z",
  },
];

export const createRoom = (name: string): Room => {
  const newRoom: Room = {
    id: `room-${mockRooms.length + 1}`,
    name,
    createdBy: "admin@example.com",
    createdAt: new Date().toISOString(),
  };
  mockRooms.push(newRoom);
  return newRoom;
};

export const getRoomById = (id: string): Room | undefined => {
  return mockRooms.find(room => room.id === id);
};
