import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "./logo";

type AuthFormMode = "login" | "register";

interface AuthFormProps {
  mode: AuthFormMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <Logo className="justify-center mb-4" />
        <CardTitle className="font-headline text-3xl">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Join our community to save animals."
            : "Sign in to continue to your dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isRegister && (
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        {isRegister && (
          <>
            <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">I am a...</Label>
              <Select>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User (Reporter)</SelectItem>
                  <SelectItem value="ngo">NGO Member</SelectItem>
                  <SelectItem value="hospital">Hospital Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full font-bold">
          {isRegister ? "Register" : "Login"}
        </Button>
        <div className="text-center text-sm">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <Link href={isRegister ? "/login" : "/register"} className="underline" prefetch={false}>
            {isRegister ? "Login" : "Sign up"}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
