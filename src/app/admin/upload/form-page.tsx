'use client'
import Image from "next/image";
import { useState } from "react";
import SaveData, { DataToSave } from "./save-data";
import Link from "next/link";
import { read } from "fs";

export default function FormPage() {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        text: '',
        pictureFile: null as unknown as File
    })

    const pictureUrl = formData.pictureFile ? URL.createObjectURL(formData.pictureFile) : undefined

    const pictureElement = pictureUrl ? (
        <>
            <Image
                width={600}
                height={600}
                src={pictureUrl}
                alt='Puzzle picture'
            />
        </>
    )
        :
        (<>No picture selected</>)


    const generatedLink = formData.id ? (
        <Link href={`/puzzle/${formData.id}`} ><span className="hover:text-red-400">{`${window.location.origin}/puzzle/${formData.id}`}</span></Link>
    ) : (
        <></>
    )

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (!formData.title || !formData.text || !formData.pictureFile) {
            return
        }

        const dataToSave = {
            id: formData.id,
            title: formData.title,
            text: formData.text,
            picture: {
                name: formData.pictureFile.name,
                body: await file2Base64(formData.pictureFile)
            }
        } as DataToSave

        SaveData(dataToSave).then((uuid) => {
            setFormData({ ...formData, id: uuid })
        })

    };

    return (<div className="hero m-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <div className="mockup-browser border border-base-300">
                    <div className="mockup-browser-toolbar">
                        <div className="input border border-base-300">
                            {generatedLink}
                        </div>
                    </div>
                    <div className="flex justify-center px-4 py-4 border-t border-base-300 w-full h-full">
                        {pictureElement}
                    </div>
                </div>
            </div>

            <div className="card shrink-0 w-full max-w-xl shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit}>

                    <div className="form-control">
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                            onChange={(event) => {
                                console.log('doing on change')
                                if (!event || !event.target || !event.target.files || !event.target.files[0]) {
                                    return
                                }
                                const file = event.target.files[0]
                                setFormData({ ...formData, pictureFile: file })
                            }}
                            required
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
                            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                            value={formData.title}
                        />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Text Points</span>
                        </label>
                        <textarea
                            onChange={(event) => setFormData({ ...formData, text: event.target.value })}
                            value={formData.text}
                            className="textarea textarea-bordered textarea-lg"
                            placeholder=""
                            required
                        ></textarea>
                    </div>
                    {formData.id ? (<p className="text-center">Generated URL: {generatedLink}</p>) : (<></>)}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Generate puzzle link</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}