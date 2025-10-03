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
import { useAuth, useUser, useDoc, useFirestore } from "@/firebase";
import { signOut } from "firebase/auth";
import { Skeleton } from "./ui/skeleton";
import { useMemoFirebase } from "@/firebase/provider";
import { doc } from "firebase/firestore";

const menuItems = [
  { href: "/dashboard", icon: <FileText />, label: "Report Animal", roles: ["user"] },
  { href: "/ngo-dashboard", icon: <HeartHandshake />, label: "Rescue Dashboard", roles: ["ngo"] },
  { href: "/hospital-dashboard", icon: <Hospital />, label: "Hospital Dashboard", roles: ["hospital"] },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user: authUser, loading: authLoading, error: authError } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, "users", authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: profileLoading } = useDoc<{ userType: string }>(userDocRef);
  
  const loading = authLoading || profileLoading;

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const currentRole = userProfile?.userType || 'user';
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

  if (authError || !authUser) {
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
                    <AvatarImage src={authUser.photoURL || `https://picsum.photos/seed/${authUser.uid}/40/40`} />
                    <AvatarFallback>{authUser.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{userProfile?.firstName || authUser.email}</span>
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
