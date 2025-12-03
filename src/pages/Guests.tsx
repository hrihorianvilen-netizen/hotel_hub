import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { guests, reservations } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Users, Search, Plus, Mail, Phone, Globe, FileText, History } from 'lucide-react';

const Guests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<(typeof guests)[0] | null>(null);

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.document.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGuestReservations = (guestId: string) =>
    reservations.filter((r) => r.guestId === guestId);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guest Management</h1>
          <p className="text-muted-foreground mt-1">{filteredGuests.length} registered guests</p>
        </div>
        <Button variant="gold">
          <Plus className="w-4 h-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or document..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Guests Table */}
      <div className="bg-card rounded-xl border shadow-card overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold">Guest</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Document</TableHead>
              <TableHead className="font-semibold">Nationality</TableHead>
              <TableHead className="font-semibold">Total Stays</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow
                key={guest.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setSelectedGuest(guest)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {guest.name.charAt(0)}
                    </div>
                    <span className="font-medium">{guest.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3 text-muted-foreground" />
                      <span>{guest.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{guest.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{guest.document}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    <span>{guest.nationality}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={guest.totalStays >= 5 ? 'success' : 'secondary'}>
                    {guest.totalStays} {guest.totalStays === 1 ? 'stay' : 'stays'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No guests found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}

      {/* Guest Detail Dialog */}
      <Dialog open={!!selectedGuest} onOpenChange={() => setSelectedGuest(null)}>
        <DialogContent className="max-w-lg">
          {selectedGuest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-lg">
                    {selectedGuest.name.charAt(0)}
                  </div>
                  {selectedGuest.name}
                </DialogTitle>
                <DialogDescription>Guest Profile</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedGuest.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedGuest.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Document</p>
                      <p className="font-medium font-mono">{selectedGuest.document}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Nationality</p>
                      <p className="font-medium">{selectedGuest.nationality}</p>
                    </div>
                  </div>
                </div>

                {/* Stay History */}
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-foreground">Stay History</span>
                  </div>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-foreground">{selectedGuest.totalStays}</p>
                    <p className="text-sm text-muted-foreground">Total Stays</p>
                  </div>
                  {getGuestReservations(selectedGuest.id).length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t">
                      {getGuestReservations(selectedGuest.id)
                        .slice(0, 3)
                        .map((res) => (
                          <div
                            key={res.id}
                            className="flex items-center justify-between text-sm p-2 rounded bg-muted/30"
                          >
                            <span>
                              {res.checkIn} - {res.checkOut}
                            </span>
                            <Badge
                              variant={res.status === 'checked-in' ? 'success' : 'secondary'}
                            >
                              {res.status}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" variant="gold">
                    New Reservation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Edit Profile
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

export default Guests;
