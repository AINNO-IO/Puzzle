import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload new picture",
  description: "Upload new picture for puzzle",
};

export default function Home() {
  return (
    <main>
      <div className="hero min-h- ">

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
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </main>
  );
}
