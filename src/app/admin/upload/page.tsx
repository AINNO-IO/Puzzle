import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";

export const metadata: Metadata = {
  title: "Upload new picture",
  description: "Upload new picture for puzzle",
};

export default function Home() {
  return (
    <main className="mt-20">
      <div className="hero m-auto">

        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">

            <div className="mockup-browser border border-base-300">
              <div className="mockup-browser-toolbar">
                <div className="input border border-base-300">
                  https://daisyui.com
                </div>
              </div>
              <div className="flex justify-center px-4 py-16 border-t border-base-300">
                Hello!
              </div>
            </div>

          </div>



          <div className="card shrink-0 w-full max-w-xl shadow-2xl">
            <form className="card-body">

              <div className="form-control">
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  required
                />
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Text Points</span>
                </label>
                <textarea className="textarea textarea-bordered textarea-lg" placeholder=""></textarea>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Generate puzzle link</button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </main>
  );
}
