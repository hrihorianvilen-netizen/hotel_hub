import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useHotel } from '@/contexts/HotelContext';
import {
  reservations,
  guests,
  hotels,
  rooms,
  formatCurrency,
  ReservationStatus,
} from '@/data/mockData';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CalendarCheck,
  Search,
  Plus,
  User,
  Building2,
  Calendar,
  DollarSign,
  LogIn,
  LogOut,
  Eye,
} from 'lucide-react';

const statusConfig: Record<
  ReservationStatus,
  { label: string; variant: 'success' | 'info' | 'secondary' | 'destructive' }
> = {
  confirmed: { label: 'Confirmed', variant: 'info' },
  'checked-in': { label: 'Checked In', variant: 'success' },
  'checked-out': { label: 'Checked Out', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

const Reservations = () => {
  const { selectedHotel, allHotels } = useHotel();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<
    (typeof reservations)[0] | null
  >(null);

  const filteredReservations = reservations.filter((res) => {
    const matchesHotel = !selectedHotel || res.hotelId === selectedHotel.id;
    const guest = guests.find((g) => g.id === res.guestId);
    const matchesSearch =
      guest?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    return matchesHotel && matchesSearch && matchesStatus;
  });

  const getGuestName = (guestId: string) => guests.find((g) => g.id === guestId)?.name || '';
  const getHotelName = (hotelId: string) => allHotels.find((h) => h.id === hotelId)?.name || '';
  const getRoomNumber = (roomId: string) => rooms.find((r) => r.id === roomId)?.number || '';

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">
            {selectedHotel ? selectedHotel.name : 'All Hotels'} • {filteredReservations.length}{' '}
            reservations
          </p>
        </div>
        <Button variant="gold">
          <Plus className="w-4 h-4 mr-2" />
          New Reservation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest name or reservation ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="checked-in">Checked In</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reservations Table */}
      <div className="bg-card rounded-xl border shadow-card overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Reservation</TableHead>
              <TableHead className="font-semibold">Guest</TableHead>
              {!selectedHotel && <TableHead className="font-semibold">Hotel</TableHead>}
              <TableHead className="font-semibold">Room</TableHead>
              <TableHead className="font-semibold">Check In</TableHead>
              <TableHead className="font-semibold">Check Out</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Total</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setSelectedReservation(reservation)}
              >
                <TableCell className="font-medium">{reservation.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span>{getGuestName(reservation.guestId)}</span>
                  </div>
                </TableCell>
                {!selectedHotel && (
                  <TableCell className="text-muted-foreground">
                    {getHotelName(reservation.hotelId)}
                  </TableCell>
                )}
                <TableCell>{getRoomNumber(reservation.roomId)}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[reservation.status].variant}>
                    {statusConfig[reservation.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(reservation.totalAmount)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {reservation.status === 'confirmed' && (
                      <Button size="sm" variant="success" className="h-8">
                        <LogIn className="w-3 h-3 mr-1" />
                        Check In
                      </Button>
                    )}
                    {reservation.status === 'checked-in' && (
                      <Button size="sm" variant="outline" className="h-8">
                        <LogOut className="w-3 h-3 mr-1" />
                        Check Out
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <CalendarCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No reservations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Reservation Detail Dialog */}
      <Dialog open={!!selectedReservation} onOpenChange={() => setSelectedReservation(null)}>
        <DialogContent className="max-w-lg">
          {selectedReservation && (
            <>
              <DialogHeader>
                <DialogTitle>Reservation {selectedReservation.id}</DialogTitle>
                <DialogDescription>
                  Created on {selectedReservation.createdAt}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Guest Info */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {getGuestName(selectedReservation.guestId)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {guests.find((g) => g.id === selectedReservation.guestId)?.email}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs">Hotel</span>
                    </div>
                    <p className="font-medium text-foreground">
                      {getHotelName(selectedReservation.hotelId)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CalendarCheck className="w-4 h-4" />
                      <span className="text-xs">Room</span>
                    </div>
                    <p className="font-medium text-foreground">
                      Room {getRoomNumber(selectedReservation.roomId)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Check In</span>
                    </div>
                    <p className="font-medium text-foreground">{selectedReservation.checkIn}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Check Out</span>
                    </div>
                    <p className="font-medium text-foreground">{selectedReservation.checkOut}</p>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-foreground">Payment Summary</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {calculateNights(selectedReservation.checkIn, selectedReservation.checkOut)}{' '}
                        nights
                      </span>
                      <span>{formatCurrency(selectedReservation.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Paid</span>
                      <span className="text-success">
                        {formatCurrency(selectedReservation.paidAmount)}
                      </span>
                    </div>
                    {selectedReservation.totalAmount - selectedReservation.paidAmount > 0 && (
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                        <span>Balance Due</span>
                        <span className="text-destructive">
                          {formatCurrency(
                            selectedReservation.totalAmount - selectedReservation.paidAmount
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {selectedReservation.status === 'confirmed' && (
                    <Button className="flex-1" variant="success">
                      <LogIn className="w-4 h-4 mr-2" />
                      Process Check In
                    </Button>
                  )}
                  {selectedReservation.status === 'checked-in' && (
                    <Button className="flex-1" variant="gold">
                      <LogOut className="w-4 h-4 mr-2" />
                      Process Check Out
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    Edit Reservation
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Reservations;
