import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { OccupancyChart } from '@/components/dashboard/OccupancyChart';
import { HotelCard } from '@/components/dashboard/HotelCard';
import { RecentReservations } from '@/components/dashboard/RecentReservations';
import { useAuth } from '@/contexts/AuthContext';
import { useHotel } from '@/contexts/HotelContext';
import {
  hotels,
  getRoomStatusCounts,
  getOccupancyRate,
  getTotalRevenue,
  formatCurrency,
  reservations,
} from '@/data/mockData';
import {
  BedDouble,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { selectedHotel } = useHotel();

  const hotelId = selectedHotel?.id;
  const counts = getRoomStatusCounts(hotelId);
  const occupancy = getOccupancyRate(hotelId);
  const revenue = getTotalRevenue(hotelId);
  const activeReservations = hotelId
    ? reservations.filter((r) => r.hotelId === hotelId && r.status === 'checked-in').length
    : reservations.filter((r) => r.status === 'checked-in').length;

  const isNetworkView = !selectedHotel && user?.role === 'admin';

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {selectedHotel ? selectedHotel.name : 'Network Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {selectedHotel
            ? `Managing ${selectedHotel.location}`
            : `Overview of all ${hotels.length} hotels in the network`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Rooms"
          value={counts.total}
          subtitle={`${counts.available} available now`}
          icon={BedDouble}
          variant="default"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${occupancy}%`}
          subtitle={`${counts.occupied} rooms occupied`}
          icon={TrendingUp}
          trend={{ value: 12, positive: true }}
          variant="primary"
        />
        <StatsCard
          title="Active Reservations"
          value={activeReservations}
          subtitle="Currently checked in"
          icon={CalendarCheck}
          variant="success"
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(revenue)}
          subtitle="This period"
          icon={DollarSign}
          trend={{ value: 8, positive: true }}
          variant="info"
        />
      </div>

      {/* Network View - Hotel Cards */}
      {isNetworkView && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Hotel Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      )}

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyChart hotelId={hotelId} />
        <RecentReservations hotelId={hotelId} />
      </div>

      {/* Quick Stats for Single Hotel */}
      {selectedHotel && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-success">{counts.available}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-destructive">{counts.occupied}</p>
            <p className="text-sm text-muted-foreground">Occupied</p>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-warning">{counts.maintenance}</p>
            <p className="text-sm text-muted-foreground">Maintenance</p>
          </div>
          <div className="bg-info/10 border border-info/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-info">{counts.cleaning}</p>
            <p className="text-sm text-muted-foreground">Cleaning</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
