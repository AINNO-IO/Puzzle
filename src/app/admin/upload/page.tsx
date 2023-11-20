import type { Metadata } from "next";
import FormPage from "./form-page";

export const metadata: Metadata = {
  title: "Upload new picture",
  description: "Upload new picture for puzzle",
};

export default function Upload() {

  return (
    <main className="mt-20">
      <FormPage />
    </main>
  );
}
