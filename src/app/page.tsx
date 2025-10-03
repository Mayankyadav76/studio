import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PawPrint, HeartHandshake, Hospital, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <HeartHandshake className="w-8 h-8 text-primary" />,
    title: "Report and Rescue",
    description: "Easily report animals in distress with photos and location. NGOs are instantly notified to coordinate a rescue.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "NGO Coordination",
    description: "A powerful dashboard for NGOs to manage reports, prioritize urgent cases with AI assistance, and dispatch rescue teams.",
  },
  {
    icon: <Hospital className="w-8 h-8 text-primary" />,
    title: "Hospital Care",
    description: "Veterinary hospitals can update treatment progress, ensuring every rescued animal gets the best possible care.",
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-dog");
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    A Lifeline for Animals in Need
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Animal Rescue Connect is a platform that unites compassionate citizens, NGOs, and veterinary hospitals to provide timely help to animals in distress.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="font-bold tracking-wide">
                    <Link href="/register">Join the Cause</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="font-bold tracking-wide">
                    <Link href="/dashboard">Report an Animal</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              )}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">How We Make a Difference</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform streamlines the entire rescue process, from the initial report to the final treatment, ensuring no call for help goes unanswered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Animal Rescue Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}