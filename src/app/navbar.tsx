import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-3 border-b">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image
          src="/citadele.svg"
          alt="Citadele logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </div>

      <div className="w-auto block flex-grow text-right">
       <Link href="/admin/upload"> <button className="btn btn-secondary mx-5 px-5">New puzzle</button></Link>
        <button className="btn btn-primary px-5">Login</button>
      </div>
    </nav>
  );
}
