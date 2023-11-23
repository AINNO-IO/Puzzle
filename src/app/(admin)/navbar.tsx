import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, auth } from "auth"
import { redirect } from "next/navigation"

export default async function Navbar() {
  const session = await auth()
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

      <div className="w-auto block flex-grow text-right">
        {session?.user ? (
          <>
            <Link href="/admin"> <button className="btn btn-secondary mr-5 px-5">All puzzles</button></Link>
            <Link href="/admin/upload"> <button className="btn btn-secondary mr-5 px-5">New puzzle</button></Link>
            <SignOut />
          </>
        ) : (<></>)}
        {!session?.user ? (
          <SignIn />
        ) : (<></>)}
      </div>
    </nav>
  );
}

export function SignIn({
  provider,
}: { provider?: string }) {

  return (
    <form
      className=" inline"
      action={async () => {
        "use server"
        const url = await signIn(provider, { redirect: false })
        redirect(url.replace("signin", "api/auth/signin"))
      }}
    >
      <button className="btn btn-primary px-5">Sign In</button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className=" inline"
    >
      <button className="btn btn-primary px-5">Sign Out</button>
    </form>
  )
}