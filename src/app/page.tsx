import { GetStartedButton } from "@/components/get-started-button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Better Auth <br /> with Next.js & Prisma Starter
        </h1>
        <GetStartedButton />
      </div>
    </div>
  );
}
