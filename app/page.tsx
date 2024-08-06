import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300">
      <div className="flex justify-between">
        <div className="flex">
          <h1 className=" font-bold text-gray-800">Welcome to Mahjong Ledger</h1>
        </div>
        <div className="flex">
          <form action="/signout" method="POST" >
            <button type="submit" className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 mx-60 rounded'>
              Logout
            </button>
          </form>
        </div>
      </div>
      <section className="flex justify-items-center">
      <div>
          <Link href="/account">User Profile</Link>
        </div>
      </section>

    </main>
  );
}
