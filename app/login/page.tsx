import { LoginForm } from "@/components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[url('/vaga.jpg')] h-screen bg-cover bg-center bg-no-repeat">
      <div className=" flex min-h-full flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
