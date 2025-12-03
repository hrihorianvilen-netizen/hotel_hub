import { reservations, guests, hotels, rooms, formatCurrency } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentReservationsProps {
  hotelId?: string;
  limit?: number;
}

const statusVariants: Record<string, 'success' | 'warning' | 'info' | 'destructive'> = {
  confirmed: 'info',
  'checked-in': 'success',
  'checked-out': 'secondary' as any,
  cancelled: 'destructive',
};

export const RecentReservations = ({ hotelId, limit = 5 }: RecentReservationsProps) => {
  const navigate = useNavigate();
  const filteredReservations = hotelId
    ? reservations.filter((r) => r.hotelId === hotelId)
    : reservations;

  const recentReservations = filteredReservations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  return (
    <div className="bg-card rounded-xl border shadow-card animate-slide-up">
      <div className="flex items-center justify-between p-5 border-b">
        <h3 className="text-lg font-semibold text-foreground">Recent Reservations</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/reservations')}>
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="divide-y">
        {recentReservations.map((reservation) => {
          const guest = guests.find((g) => g.id === reservation.guestId);
          const hotel = hotels.find((h) => h.id === reservation.hotelId);
          const room = rooms.find((r) => r.id === reservation.roomId);

          return (
            <div
              key={reservation.id}
              className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => navigate('/reservations')}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{guest?.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>{hotel?.name}</span>
                    </div>
                    <span>Room {room?.number}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {reservation.checkIn} → {reservation.checkOut}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge variant={statusVariants[reservation.status]}>
                    {reservation.status.replace('-', ' ')}
                  </Badge>
                  <p className="text-sm font-semibold text-foreground">
                    {formatCurrency(reservation.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
