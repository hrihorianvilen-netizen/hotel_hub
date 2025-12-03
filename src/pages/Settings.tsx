import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Users, Shield, Bell, Building2, Plus, Edit, Trash2 } from 'lucide-react';

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  manager: 'Hotel Manager',
  receptionist: 'Receptionist',
  housekeeping: 'Housekeeping',
};

const roleBadgeVariants: Record<string, 'default' | 'secondary' | 'success' | 'info'> = {
  admin: 'default',
  manager: 'success',
  receptionist: 'info',
  housekeeping: 'secondary',
};

const Settings = () => {
  const { user, switchUser } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    reservations: true,
    checkouts: true,
    reports: false,
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage system configuration and users</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="w-4 h-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            General
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and their access levels</CardDescription>
              </div>
              <Button variant="gold">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              {/* Demo User Switcher */}
              <div className="mb-6 p-4 rounded-lg bg-info/10 border border-info/20">
                <p className="text-sm font-medium text-info mb-2">Demo Mode: Switch User Role</p>
                <Select value={user?.id} onValueChange={switchUser}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name} ({roleLabels[u.role]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {u.name.charAt(0)}
                          </div>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        <Badge variant={roleBadgeVariants[u.role]}>{roleLabels[u.role]}</Badge>
                      </TableCell>
                      <TableCell>
                        {u.hotelId ? (
                          <span className="text-muted-foreground">
                            {u.hotelId === 'hotel-1'
                              ? 'Grand Palace'
                              : u.hotelId === 'hotel-2'
                              ? 'Ocean View'
                              : 'Mountain Lodge'}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">All Hotels</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Define what each role can access in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(roleLabels).map(([role, label]) => (
                  <div key={role} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {role === 'admin'
                            ? 'Full access to all features'
                            : role === 'manager'
                            ? 'Manage assigned hotel operations'
                            : role === 'receptionist'
                            ? 'Handle reservations and check-ins'
                            : 'Room status updates'}
                        </p>
                      </div>
                      <Badge variant={roleBadgeVariants[role]}>{label}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { key: 'dashboard', label: 'Dashboard' },
                        { key: 'rooms', label: 'Room Management' },
                        { key: 'reservations', label: 'Reservations' },
                        { key: 'guests', label: 'Guest Management' },
                        { key: 'reports', label: 'Reports' },
                        { key: 'financials', label: 'Financials' },
                        { key: 'settings', label: 'Settings' },
                        { key: 'users', label: 'User Management' },
                      ].map((permission) => {
                        const hasAccess =
                          role === 'admin' ||
                          (role === 'manager' && permission.key !== 'users') ||
                          (role === 'receptionist' &&
                            ['dashboard', 'rooms', 'reservations', 'guests'].includes(permission.key)) ||
                          (role === 'housekeeping' &&
                            ['dashboard', 'rooms'].includes(permission.key));

                        return (
                          <div
                            key={permission.key}
                            className={`text-sm px-3 py-2 rounded-md ${
                              hasAccess
                                ? 'bg-success/10 text-success'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {permission.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: 'email',
                  title: 'Email Notifications',
                  description: 'Receive notifications via email',
                },
                {
                  key: 'reservations',
                  title: 'New Reservations',
                  description: 'Get notified when new reservations are made',
                },
                {
                  key: 'checkouts',
                  title: 'Upcoming Check-outs',
                  description: 'Alerts for guests checking out today',
                },
                {
                  key: 'reports',
                  title: 'Weekly Reports',
                  description: 'Receive weekly performance summaries',
                },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="font-medium text-foreground">{setting.title}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={notifications[setting.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [setting.key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>General system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>System Name</Label>
                    <Input defaultValue="HotelHub Management System" />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="BRL">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">BRL - Brazilian Real</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="america-sao_paulo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-sao_paulo">America/Sao_Paulo</SelectItem>
                        <SelectItem value="america-new_york">America/New_York</SelectItem>
                        <SelectItem value="europe-london">Europe/London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="gold" className="mt-4">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
