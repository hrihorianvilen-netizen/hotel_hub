import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getRoomStatusCounts } from '@/data/mockData';

interface OccupancyChartProps {
  hotelId?: string;
}

const COLORS = {
  available: 'hsl(142, 71%, 45%)',
  occupied: 'hsl(0, 72%, 51%)',
  maintenance: 'hsl(38, 92%, 50%)',
  cleaning: 'hsl(199, 89%, 48%)',
};

export const OccupancyChart = ({ hotelId }: OccupancyChartProps) => {
  const counts = getRoomStatusCounts(hotelId);

  const data = [
    { name: 'Available', value: counts.available, color: COLORS.available },
    { name: 'Occupied', value: counts.occupied, color: COLORS.occupied },
    { name: 'Maintenance', value: counts.maintenance, color: COLORS.maintenance },
    { name: 'Cleaning', value: counts.cleaning, color: COLORS.cleaning },
  ].filter((item) => item.value > 0);

  return (
    <div className="bg-card rounded-xl border p-6 shadow-card animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">Room Status Overview</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-foreground">{counts.total}</p>
          <p className="text-sm text-muted-foreground">Total Rooms</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-foreground">
            {counts.total > 0 ? Math.round((counts.occupied / counts.total) * 100) : 0}%
          </p>
          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
        </div>
      </div>
    </div>
  );
};
