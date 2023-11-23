import type { Metadata } from "next";
import FormPage from "./form-page";
import { auth } from "auth"

export const metadata: Metadata = {
  title: "Upload new picture",
  description: "Upload new picture for puzzle",
};

export default async function Upload() {
  const session = await auth()
  
  if (!session?.user) {
    return (
      <div role="alert" className="alert alert-error mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Access Denied. Please sign in!</span>
      </div>)
  }
  return (
    <main className="mt-20">
      <FormPage />
    </main>
  );
}
