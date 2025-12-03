import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useHotel } from '@/contexts/HotelContext';
import {
  hotels,
  reservations,
  rooms,
  formatCurrency,
  getRoomStatusCounts,
  getOccupancyRate,
} from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { FileText, Download, Calendar, TrendingUp, Building2 } from 'lucide-react';

const Reports = () => {
  const { selectedHotel } = useHotel();

  // Generate mock chart data
  const occupancyData = hotels.map((hotel) => ({
    name: hotel.name.split(' ')[0],
    occupancy: getOccupancyRate(hotel.id),
    rooms: getRoomStatusCounts(hotel.id).total,
  }));

  const revenueByMonth = [
    { month: 'Jul', revenue: 45000 },
    { month: 'Aug', revenue: 52000 },
    { month: 'Sep', revenue: 48000 },
    { month: 'Oct', revenue: 61000 },
    { month: 'Nov', revenue: 55000 },
    { month: 'Dec', revenue: 72000 },
  ];

  const reservationsByStatus = [
    { status: 'Confirmed', count: reservations.filter((r) => r.status === 'confirmed').length },
    { status: 'Checked In', count: reservations.filter((r) => r.status === 'checked-in').length },
    { status: 'Checked Out', count: reservations.filter((r) => r.status === 'checked-out').length },
    { status: 'Cancelled', count: reservations.filter((r) => r.status === 'cancelled').length },
  ];

  const totalRevenue = reservations.reduce((sum, r) => sum + r.paidAmount, 0);
  const totalReservations = reservations.length;
  const avgOccupancy = Math.round(
    hotels.reduce((sum, h) => sum + getOccupancyRate(h.id), 0) / hotels.length
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            {selectedHotel ? selectedHotel.name : 'Network Overview'} • Analytics & Insights
          </p>
        </div>
        <Button variant="gold">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-card animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reservations
            </CardTitle>
            <Calendar className="w-4 h-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations}</div>
            <p className="text-xs text-muted-foreground">Current period</p>
          </CardContent>
        </Card>
        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Occupancy
            </CardTitle>
            <Building2 className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground">Across all hotels</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <Card className="shadow-card animate-slide-up">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--secondary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy by Hotel */}
        <Card className="shadow-card animate-slide-up">
          <CardHeader>
            <CardTitle>Occupancy by Hotel</CardTitle>
            <CardDescription>Current occupancy rate per property</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Occupancy']}
                  />
                  <Bar dataKey="occupancy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Occupancy Report', description: 'Daily and monthly room occupancy', icon: Building2 },
          { title: 'Revenue Report', description: 'Billing and payment details', icon: TrendingUp },
          { title: 'Reservation Report', description: 'Bookings by period', icon: Calendar },
          { title: 'Guest Report', description: 'Guest statistics and history', icon: FileText },
        ].map((report) => (
          <Card
            key={report.title}
            className="shadow-card hover:shadow-card-hover transition-all cursor-pointer hover:-translate-y-0.5 animate-fade-in"
          >
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <report.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.description}</p>
              <Button variant="link" className="p-0 mt-3 h-auto">
                Generate Report →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
