import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useHotel } from '@/contexts/HotelContext';
import { rooms, hotels, formatCurrency, RoomStatus } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  BedDouble,
  Search,
  Filter,
  Plus,
  Users,
  Wifi,
  Tv,
  Wind,
  Coffee,
  Waves,
  Mountain,
  Flame,
} from 'lucide-react';

const statusConfig: Record<RoomStatus, { label: string; variant: 'available' | 'occupied' | 'maintenance' | 'cleaning' }> = {
  available: { label: 'Available', variant: 'available' },
  occupied: { label: 'Occupied', variant: 'occupied' },
  maintenance: { label: 'Maintenance', variant: 'maintenance' },
  cleaning: { label: 'Cleaning', variant: 'cleaning' },
};

const typeLabels: Record<string, string> = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite',
  presidential: 'Presidential',
};

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  TV: Tv,
  AC: Wind,
  'Mini Bar': Coffee,
  Jacuzzi: Waves,
  'Ocean View': Waves,
  'Mountain View': Mountain,
  Fireplace: Flame,
};

const Rooms = () => {
  const { selectedHotel, allHotels } = useHotel();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);

  const filteredRooms = rooms.filter((room) => {
    const matchesHotel = !selectedHotel || room.hotelId === selectedHotel.id;
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.type === typeFilter;
    return matchesHotel && matchesSearch && matchesStatus && matchesType;
  });

  const getHotelName = (hotelId: string) => {
    return allHotels.find((h) => h.id === hotelId)?.name || '';
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Room Management</h1>
          <p className="text-muted-foreground mt-1">
            {selectedHotel ? selectedHotel.name : 'All Hotels'} • {filteredRooms.length} rooms
          </p>
        </div>
        <Button variant="gold">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by room number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="occupied">Occupied</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Room Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="deluxe">Deluxe</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
            <SelectItem value="presidential">Presidential</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <Dialog key={room.id}>
            <DialogTrigger asChild>
              <div
                className="bg-card rounded-xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in"
                onClick={() => setSelectedRoom(room)}
              >
                {/* Room Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BedDouble className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Room {room.number}</p>
                      <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                    </div>
                  </div>
                  <Badge variant={statusConfig[room.status].variant}>
                    {statusConfig[room.status].label}
                  </Badge>
                </div>

                {/* Room Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium text-foreground">
                      {typeLabels[room.type]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Capacity</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{room.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Daily Rate</span>
                    <span className="text-sm font-bold text-secondary">
                      {formatCurrency(room.dailyRate)}
                    </span>
                  </div>
                </div>

                {/* Hotel Name (if network view) */}
                {!selectedHotel && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground truncate">
                      {getHotelName(room.hotelId)}
                    </p>
                  </div>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Room {room.number} Details</DialogTitle>
                <DialogDescription>
                  {typeLabels[room.type]} • {getHotelName(room.hotelId)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusConfig[room.status].variant}>
                    {statusConfig[room.status].label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Daily Rate</span>
                  <span className="font-bold text-secondary">{formatCurrency(room.dailyRate)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">{room.capacity} guests</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Coffee;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-sm"
                        >
                          <Icon className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  {room.status === 'available' && (
                    <Button className="flex-1" variant="gold">
                      Create Reservation
                    </Button>
                  )}
                  {room.status === 'cleaning' && (
                    <Button className="flex-1" variant="success">
                      Mark as Available
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    Edit Room
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <BedDouble className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No rooms found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Rooms;
