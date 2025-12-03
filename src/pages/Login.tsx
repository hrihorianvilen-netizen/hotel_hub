import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Hotel, Lock, Mail, ChevronRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { switchUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(users[0].id);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = () => {
    switchUser(selectedUser);
    navigate('/dashboard');
  };

  const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    manager: 'Hotel Manager',
    receptionist: 'Receptionist',
    housekeeping: 'Housekeeping',
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <Hotel className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">HotelHub</h1>
              <p className="text-primary-foreground/70">Management System</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Multi-Property Hotel Management Made Simple
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Efficiently manage rooms, reservations, and operations across all your hotel properties
            from a single, unified platform.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Properties', value: '3' },
              { label: 'Rooms', value: '265' },
              { label: 'Reservations', value: '1.2K+' },
              { label: 'Users', value: '6' },
            ].map((stat) => (
              <div key={stat.label} className="bg-primary-foreground/10 rounded-lg p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Hotel className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">HotelHub</h1>
              <p className="text-sm text-muted-foreground">Management System</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Demo Login Card */}
          <Card className="shadow-card border-secondary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Demo Mode
              </CardTitle>
              <CardDescription>
                Select a user role to explore the system with different permission levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Demo User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{u.name}</span>
                          <span className="text-muted-foreground">({roleLabels[u.role]})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleDemoLogin} variant="gold" className="w-full" size="lg">
                Enter Demo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or sign in with credentials</span>
            </div>
          </div>

          {/* Standard Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Button variant="link" className="p-0 h-auto text-primary">
                Forgot password?
              </Button>
            </div>
            <Button className="w-full" size="lg" disabled>
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Standard login is disabled in demo mode. Use the demo user selector above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
