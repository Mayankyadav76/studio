import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <AuthForm mode="register" />
    </div>
  );
}
