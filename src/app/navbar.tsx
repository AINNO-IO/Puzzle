import Image from "next/image";

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
        <button className="btn btn-primary px-5">Login</button>
      </div>
    </nav>
  );
}
