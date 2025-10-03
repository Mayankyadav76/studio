import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Logo />
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
            <Link href="/register">Register</Link>
        </Button>
      </nav>
    </header>
  );
}
