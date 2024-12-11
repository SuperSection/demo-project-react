import { useLocation } from 'react-router';
import { Home, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { APP_URL } from '@/config/appPaths';
import LogoutButton from '@/pages/user/_components/LogoutButton';

// Menu items.
const items = [
  {
    title: 'Profile',
    url: APP_URL.profile,
    icon: Settings,
  },
  {
    title: 'Your Address',
    url: APP_URL.address,
    icon: Home,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Demo Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={location.pathname === item.url ? 'bg-neutral-600/30 rounded-md' : ''}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
