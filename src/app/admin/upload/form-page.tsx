'use client'
import Image from "next/image"
import { useState } from "react"

export default function FormPage() {
    const [picture, setPicture] = useState('')

    const pictureElement = picture ? (
        <Image
            width={600}
            height={600}
            src={picture}
            alt='Puzzle picture'
        />
    )
        :
        (<>No picture selected</>)

    return (<div className="hero m-auto">

        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">

                

                <div className="mockup-browser border border-base-300">
                    <div className="mockup-browser-toolbar">
                        <div className="input border border-base-300">
                            
                        </div>
                    </div>
                    <div className="flex justify-center px-4 py-16 border-t border-base-300">
                    {pictureElement}
                    </div>
                </div>

            </div>



            <div className="card shrink-0 w-full max-w-xl shadow-2xl">
                <form className="card-body">

                    <div className="form-control">
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" 
                         onChange={(event) => {
                            console.log('doing on change')
                            if (!event || !event.target || !event.target.files) {
                                return
                            }
                            // const reader = new FileReader()
                            // reader.readAsDataURL(event.target.files[0])
                            // reader.result
                            const result = URL.createObjectURL(event.target.files[0])
                            setPicture(result)
                            console.log(result)
                        }}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            accept="image/*"
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


    )
}