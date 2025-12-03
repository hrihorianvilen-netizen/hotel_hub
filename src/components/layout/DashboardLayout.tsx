import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const { collapsed } = useSidebar();

  return (
    <>
      <AppSidebar />
      <main
        className={cn(
          'transition-all duration-300 ease-in-out',
          collapsed ? 'ml-[70px]' : 'ml-[260px]'
        )}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
};
