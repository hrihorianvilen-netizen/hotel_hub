import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useHotel } from '@/contexts/HotelContext';
import { reservations, hotels, guests, rooms, formatCurrency } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Download,
} from 'lucide-react';

const Financials = () => {
  const { selectedHotel, allHotels } = useHotel();

  const filteredReservations = selectedHotel
    ? reservations.filter((r) => r.hotelId === selectedHotel.id)
    : reservations;

  const totalRevenue = filteredReservations.reduce((sum, r) => sum + r.totalAmount, 0);
  const totalPaid = filteredReservations.reduce((sum, r) => sum + r.paidAmount, 0);
  const totalPending = totalRevenue - totalPaid;

  const getGuestName = (guestId: string) => guests.find((g) => g.id === guestId)?.name || '';
  const getHotelName = (hotelId: string) => allHotels.find((h) => h.id === hotelId)?.name || '';
  const getRoomNumber = (roomId: string) => rooms.find((r) => r.id === roomId)?.number || '';

  // Group by hotel for summary
  const hotelSummary = allHotels.map((hotel) => {
    const hotelReservations = reservations.filter((r) => r.hotelId === hotel.id);
    return {
      hotel: hotel.name,
      revenue: hotelReservations.reduce((sum, r) => sum + r.totalAmount, 0),
      paid: hotelReservations.reduce((sum, r) => sum + r.paidAmount, 0),
      reservations: hotelReservations.length,
    };
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
          <p className="text-muted-foreground mt-1">
            {selectedHotel ? selectedHotel.name : 'Network Overview'} • Revenue & Payments
          </p>
        </div>
        <Button variant="gold">
          <Download className="w-4 h-4 mr-2" />
          Export Financials
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-card animate-slide-up">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Received
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((totalPaid / totalRevenue) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredReservations.filter((r) => r.totalAmount > r.paidAmount).length} pending
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Booking Value
            </CardTitle>
            <CreditCard className="w-4 h-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue / filteredReservations.length || 0)}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% increase
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="by-hotel">By Hotel</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>All billing transactions from reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reservation</TableHead>
                    <TableHead>Guest</TableHead>
                    {!selectedHotel && <TableHead>Hotel</TableHead>}
                    <TableHead>Room</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((res) => {
                    const balance = res.totalAmount - res.paidAmount;
                    return (
                      <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.id}</TableCell>
                        <TableCell>{getGuestName(res.guestId)}</TableCell>
                        {!selectedHotel && <TableCell>{getHotelName(res.hotelId)}</TableCell>}
                        <TableCell>{getRoomNumber(res.roomId)}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(res.totalAmount)}
                        </TableCell>
                        <TableCell className="text-right text-success">
                          {formatCurrency(res.paidAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          {balance > 0 ? (
                            <span className="text-destructive">{formatCurrency(balance)}</span>
                          ) : (
                            <span className="text-success">Paid</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={balance > 0 ? 'warning' : 'success'}>
                            {balance > 0 ? 'Pending' : 'Complete'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Hotel Tab */}
        <TabsContent value="by-hotel">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Revenue by Hotel</CardTitle>
              <CardDescription>Financial summary per property</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hotel</TableHead>
                    <TableHead className="text-right">Reservations</TableHead>
                    <TableHead className="text-right">Total Revenue</TableHead>
                    <TableHead className="text-right">Received</TableHead>
                    <TableHead className="text-right">Pending</TableHead>
                    <TableHead className="text-right">Collection Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotelSummary.map((summary) => {
                    const pending = summary.revenue - summary.paid;
                    const rate = summary.revenue > 0 ? (summary.paid / summary.revenue) * 100 : 0;
                    return (
                      <TableRow key={summary.hotel}>
                        <TableCell className="font-medium">{summary.hotel}</TableCell>
                        <TableCell className="text-right">{summary.reservations}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(summary.revenue)}
                        </TableCell>
                        <TableCell className="text-right text-success">
                          {formatCurrency(summary.paid)}
                        </TableCell>
                        <TableCell className="text-right text-warning">
                          {formatCurrency(pending)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={rate >= 80 ? 'success' : rate >= 50 ? 'warning' : 'destructive'}>
                            {Math.round(rate)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Tab */}
        <TabsContent value="pending">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>Reservations with outstanding balances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reservation</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Balance Due</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations
                    .filter((r) => r.totalAmount > r.paidAmount)
                    .map((res) => (
                      <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.id}</TableCell>
                        <TableCell>{getGuestName(res.guestId)}</TableCell>
                        <TableCell>{getHotelName(res.hotelId)}</TableCell>
                        <TableCell>
                          <Badge variant={res.status === 'checked-in' ? 'success' : 'info'}>
                            {res.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-destructive">
                          {formatCurrency(res.totalAmount - res.paidAmount)}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="gold">
                            Process Payment
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Financials;
