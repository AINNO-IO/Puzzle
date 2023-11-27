import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between flex-wrap p-3 border-b">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href='/'>
                    <Image
                        src="/citadele.svg"
                        alt="Citadele logo"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                    />
                </Link>
            </div>
        </nav>
    )
}