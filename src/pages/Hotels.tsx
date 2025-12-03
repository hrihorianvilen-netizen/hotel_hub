import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HotelCard } from '@/components/dashboard/HotelCard';
import { hotels } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Building2 } from 'lucide-react';

const Hotels = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hotel Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage all {hotels.length} hotels in the network
          </p>
        </div>
        <Button variant="gold">
          <Plus className="w-4 h-4 mr-2" />
          Add Hotel
        </Button>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* Empty State */}
      {hotels.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No hotels configured</h3>
          <p className="text-muted-foreground mb-4">Add your first hotel to get started</p>
          <Button variant="gold">
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Hotels;
