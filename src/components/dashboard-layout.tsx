"use client";

import * as React from "react";
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  Home,
  FileText,
  HeartHandshake,
  Users,
  Hospital,
  LogOut,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { Skeleton } from "./ui/skeleton";

const menuItems = [
  { href: "/dashboard", icon: <FileText />, label: "Report Animal", roles: ["user"] },
  { href: "/ngo-dashboard", icon: <HeartHandshake />, label: "Rescue Dashboard", roles: ["ngo"] },
  { href: "/hospital-dashboard", icon: <Hospital />, label: "Hospital Dashboard", roles: ["hospital"] },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, error } = useUser();
  const auth = useAuth();
  const router = useRouter();

  // This is a mock role switching logic for demo purposes
  // TODO: Replace with real role from user data
  let currentRole = "user";
  if(pathname.includes('ngo')){
    currentRole = 'ngo';
  } else if (pathname.includes('hospital')){
    currentRole = 'hospital';
  }

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const availableMenuItems = menuItems.filter(item => item.roles.includes(currentRole));
  
  if (loading) {
    return (
      <div className="flex h-screen w-full">
        <div className="w-64 border-r p-4 hidden md:block">
          <Skeleton className="h-10 w-40 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex-1 p-8">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    // Redirect to login if not authenticated
    if (typeof window !== "undefined") {
      router.push('/login');
    }
    return null; // Render nothing while redirecting
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {availableMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full" prefetch={false}>
                    <SidebarMenuButton isActive={pathname === item.href} tooltip={item.label}>
                    {item.icon}
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Separator className="my-2" />
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                      <LogOut />
                      <span>Log Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <Separator className="my-2" />
             <div className="flex items-center gap-3 p-2">
                <Avatar>
                    <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`} />
                    <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{user.displayName || user.email}</span>
                    <span className="text-xs text-muted-foreground">{currentRole.toUpperCase()}</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-headline text-2xl font-bold">
              {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
            <div className="w-7 h-7"></div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-secondary/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}