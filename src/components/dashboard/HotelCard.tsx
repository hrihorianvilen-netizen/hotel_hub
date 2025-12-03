import { Hotel, getOccupancyRate, getTotalRevenue, formatCurrency, getRoomStatusCounts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, BedDouble, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '@/contexts/HotelContext';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  const navigate = useNavigate();
  const { setSelectedHotel } = useHotel();
  const occupancy = getOccupancyRate(hotel.id);
  const revenue = getTotalRevenue(hotel.id);
  const counts = getRoomStatusCounts(hotel.id);

  const handleViewHotel = () => {
    setSelectedHotel(hotel);
    navigate('/dashboard');
  };

  return (
    <div className="bg-card rounded-xl border shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-slide-up">
      {/* Hotel Image */}
      <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <BedDouble className="w-16 h-16 text-primary/30" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={occupancy > 70 ? 'success' : occupancy > 40 ? 'warning' : 'info'}>
            {occupancy}% Occupancy
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{hotel.location}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{counts.available}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{counts.occupied}</p>
            <p className="text-xs text-muted-foreground">Occupied</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{hotel.totalRooms}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-success/5 border border-success/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <span className="font-bold text-success">{formatCurrency(revenue)}</span>
        </div>

        {/* Action */}
        <Button onClick={handleViewHotel} className="w-full" variant="outline">
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
