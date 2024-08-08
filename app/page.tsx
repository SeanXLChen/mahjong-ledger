import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <section className="flex justify-items-center">
      <div>
          <Link href="/account">User Profile</Link>
        </div>
      </section>

    </main>
  );
}
