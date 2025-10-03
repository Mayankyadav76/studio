import { PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} prefetch={false}>
      <PawPrint className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold text-foreground">
        Animal Rescue Connect
      </span>
    </Link>
  );
}
