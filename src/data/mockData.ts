// Types
export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';
export type ReservationStatus = 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
export type UserRole = 'admin' | 'manager' | 'receptionist' | 'housekeeping';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  totalRooms: number;
  image: string;
}

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  floor: number;
  status: RoomStatus;
  dailyRate: number;
  capacity: number;
  amenities: string[];
  lastCleaned?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  nationality: string;
  totalStays: number;
}

export interface Reservation {
  id: string;
  hotelId: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  totalAmount: number;
  paidAmount: number;
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hotelId?: string;
  avatar?: string;
}

// Mock Hotels
export const hotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Grand Palace Hotel',
    location: 'São Paulo, SP',
    totalRooms: 120,
    image: '/placeholder.svg',
  },
  {
    id: 'hotel-2',
    name: 'Ocean View Resort',
    location: 'Rio de Janeiro, RJ',
    totalRooms: 85,
    image: '/placeholder.svg',
  },
  {
    id: 'hotel-3',
    name: 'Mountain Lodge',
    location: 'Gramado, RS',
    totalRooms: 60,
    image: '/placeholder.svg',
  },
];

// Mock Rooms
export const rooms: Room[] = [
  // Hotel 1 - Grand Palace Hotel
  { id: 'room-101', hotelId: 'hotel-1', number: '101', type: 'standard', floor: 1, status: 'available', dailyRate: 250, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
  { id: 'room-102', hotelId: 'hotel-1', number: '102', type: 'standard', floor: 1, status: 'occupied', dailyRate: 250, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
  { id: 'room-103', hotelId: 'hotel-1', number: '103', type: 'deluxe', floor: 1, status: 'cleaning', dailyRate: 380, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
  { id: 'room-201', hotelId: 'hotel-1', number: '201', type: 'deluxe', floor: 2, status: 'available', dailyRate: 380, capacity: 3, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
  { id: 'room-202', hotelId: 'hotel-1', number: '202', type: 'suite', floor: 2, status: 'occupied', dailyRate: 650, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
  { id: 'room-301', hotelId: 'hotel-1', number: '301', type: 'presidential', floor: 3, status: 'maintenance', dailyRate: 1200, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Living Room'] },
  { id: 'room-302', hotelId: 'hotel-1', number: '302', type: 'suite', floor: 3, status: 'available', dailyRate: 650, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'] },
  { id: 'room-104', hotelId: 'hotel-1', number: '104', type: 'standard', floor: 1, status: 'available', dailyRate: 250, capacity: 2, amenities: ['WiFi', 'TV', 'AC'] },
  // Hotel 2 - Ocean View Resort
  { id: 'room-ov101', hotelId: 'hotel-2', number: '101', type: 'standard', floor: 1, status: 'occupied', dailyRate: 320, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Ocean View'] },
  { id: 'room-ov102', hotelId: 'hotel-2', number: '102', type: 'deluxe', floor: 1, status: 'available', dailyRate: 480, capacity: 2, amenities: ['WiFi', 'TV', 'AC', 'Ocean View', 'Balcony'] },
  { id: 'room-ov201', hotelId: 'hotel-2', number: '201', type: 'suite', floor: 2, status: 'cleaning', dailyRate: 750, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Ocean View', 'Balcony', 'Jacuzzi'] },
  { id: 'room-ov202', hotelId: 'hotel-2', number: '202', type: 'suite', floor: 2, status: 'available', dailyRate: 750, capacity: 4, amenities: ['WiFi', 'TV', 'AC', 'Ocean View', 'Balcony', 'Jacuzzi'] },
  { id: 'room-ov301', hotelId: 'hotel-2', number: '301', type: 'presidential', floor: 3, status: 'occupied', dailyRate: 1500, capacity: 6, amenities: ['WiFi', 'TV', 'AC', 'Ocean View', 'Private Pool', 'Butler Service'] },
  // Hotel 3 - Mountain Lodge
  { id: 'room-ml101', hotelId: 'hotel-3', number: '101', type: 'standard', floor: 1, status: 'available', dailyRate: 280, capacity: 2, amenities: ['WiFi', 'TV', 'Fireplace', 'Mountain View'] },
  { id: 'room-ml102', hotelId: 'hotel-3', number: '102', type: 'standard', floor: 1, status: 'occupied', dailyRate: 280, capacity: 2, amenities: ['WiFi', 'TV', 'Fireplace', 'Mountain View'] },
  { id: 'room-ml201', hotelId: 'hotel-3', number: '201', type: 'deluxe', floor: 2, status: 'available', dailyRate: 420, capacity: 3, amenities: ['WiFi', 'TV', 'Fireplace', 'Mountain View', 'Balcony'] },
  { id: 'room-ml202', hotelId: 'hotel-3', number: '202', type: 'suite', floor: 2, status: 'maintenance', dailyRate: 580, capacity: 4, amenities: ['WiFi', 'TV', 'Fireplace', 'Mountain View', 'Hot Tub'] },
];

// Mock Guests
export const guests: Guest[] = [
  { id: 'guest-1', name: 'Carlos Silva', email: 'carlos.silva@email.com', phone: '+55 11 99999-1111', document: '123.456.789-00', nationality: 'Brazilian', totalStays: 5 },
  { id: 'guest-2', name: 'Ana Santos', email: 'ana.santos@email.com', phone: '+55 21 99999-2222', document: '234.567.890-11', nationality: 'Brazilian', totalStays: 2 },
  { id: 'guest-3', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 555-123-4567', document: 'AB123456', nationality: 'American', totalStays: 1 },
  { id: 'guest-4', name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+55 51 99999-3333', document: '345.678.901-22', nationality: 'Brazilian', totalStays: 8 },
  { id: 'guest-5', name: 'Pierre Dubois', email: 'pierre.dubois@email.com', phone: '+33 6 12 34 56 78', document: 'FR789012', nationality: 'French', totalStays: 3 },
];

// Mock Reservations
export const reservations: Reservation[] = [
  { id: 'res-001', hotelId: 'hotel-1', roomId: 'room-102', guestId: 'guest-1', checkIn: '2024-12-01', checkOut: '2024-12-05', status: 'checked-in', totalAmount: 1000, paidAmount: 1000, createdAt: '2024-11-25' },
  { id: 'res-002', hotelId: 'hotel-1', roomId: 'room-202', guestId: 'guest-2', checkIn: '2024-12-02', checkOut: '2024-12-07', status: 'checked-in', totalAmount: 3250, paidAmount: 2000, createdAt: '2024-11-28' },
  { id: 'res-003', hotelId: 'hotel-2', roomId: 'room-ov101', guestId: 'guest-3', checkIn: '2024-12-01', checkOut: '2024-12-04', status: 'checked-in', totalAmount: 960, paidAmount: 960, createdAt: '2024-11-20' },
  { id: 'res-004', hotelId: 'hotel-2', roomId: 'room-ov301', guestId: 'guest-4', checkIn: '2024-12-03', checkOut: '2024-12-10', status: 'checked-in', totalAmount: 10500, paidAmount: 5000, createdAt: '2024-11-30' },
  { id: 'res-005', hotelId: 'hotel-3', roomId: 'room-ml102', guestId: 'guest-5', checkIn: '2024-12-02', checkOut: '2024-12-06', status: 'checked-in', totalAmount: 1120, paidAmount: 1120, createdAt: '2024-11-29' },
  { id: 'res-006', hotelId: 'hotel-1', roomId: 'room-101', guestId: 'guest-4', checkIn: '2024-12-10', checkOut: '2024-12-15', status: 'confirmed', totalAmount: 1250, paidAmount: 500, createdAt: '2024-12-01' },
  { id: 'res-007', hotelId: 'hotel-2', roomId: 'room-ov102', guestId: 'guest-1', checkIn: '2024-12-08', checkOut: '2024-12-12', status: 'confirmed', totalAmount: 1920, paidAmount: 0, createdAt: '2024-12-02' },
  { id: 'res-008', hotelId: 'hotel-3', roomId: 'room-ml201', guestId: 'guest-2', checkIn: '2024-12-15', checkOut: '2024-12-20', status: 'confirmed', totalAmount: 2100, paidAmount: 1000, createdAt: '2024-12-03' },
];

// Mock Users
export const users: User[] = [
  { id: 'user-1', name: 'Admin Master', email: 'admin@hotelnetwork.com', role: 'admin', avatar: '/placeholder.svg' },
  { id: 'user-2', name: 'Roberto Lima', email: 'roberto@grandpalace.com', role: 'manager', hotelId: 'hotel-1' },
  { id: 'user-3', name: 'Juliana Costa', email: 'juliana@oceanview.com', role: 'manager', hotelId: 'hotel-2' },
  { id: 'user-4', name: 'Fernando Souza', email: 'fernando@mountainlodge.com', role: 'manager', hotelId: 'hotel-3' },
  { id: 'user-5', name: 'Mariana Oliveira', email: 'mariana@grandpalace.com', role: 'receptionist', hotelId: 'hotel-1' },
  { id: 'user-6', name: 'Lucas Ferreira', email: 'lucas@grandpalace.com', role: 'housekeeping', hotelId: 'hotel-1' },
];

// Helper functions
export const getHotelById = (id: string) => hotels.find(h => h.id === id);
export const getRoomsByHotel = (hotelId: string) => rooms.filter(r => r.hotelId === hotelId);
export const getGuestById = (id: string) => guests.find(g => g.id === id);
export const getReservationsByHotel = (hotelId: string) => reservations.filter(r => r.hotelId === hotelId);

export const getRoomStatusCounts = (hotelId?: string) => {
  const filteredRooms = hotelId ? rooms.filter(r => r.hotelId === hotelId) : rooms;
  return {
    available: filteredRooms.filter(r => r.status === 'available').length,
    occupied: filteredRooms.filter(r => r.status === 'occupied').length,
    maintenance: filteredRooms.filter(r => r.status === 'maintenance').length,
    cleaning: filteredRooms.filter(r => r.status === 'cleaning').length,
    total: filteredRooms.length,
  };
};

export const getOccupancyRate = (hotelId?: string) => {
  const counts = getRoomStatusCounts(hotelId);
  return counts.total > 0 ? Math.round((counts.occupied / counts.total) * 100) : 0;
};

export const getTotalRevenue = (hotelId?: string) => {
  const filteredReservations = hotelId 
    ? reservations.filter(r => r.hotelId === hotelId) 
    : reservations;
  return filteredReservations.reduce((sum, r) => sum + r.paidAmount, 0);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
