import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/common/app-sidebar';

export default function UserProfile({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <>
        <SidebarTrigger />
        {children}
      </>
    </SidebarProvider>
  );
}
