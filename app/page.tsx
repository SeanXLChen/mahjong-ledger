import Image from "next/image";
import Link from "next/link";
import GameForm from "./components/GameForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <section className="flex flex-col justify-items-center">
        <div>
          <Link href="/account">User Profile</Link>
        </div>
        <div>
          <GameForm />
        </div>
      </section>

    </main>
  );
}
