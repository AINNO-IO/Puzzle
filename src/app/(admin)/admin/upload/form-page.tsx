'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PuzzleData from "@/puzzle/puzzle-data";
import savePuzzle from "@/puzzle/puzzle-repository";
import Profile from "@/app/(public)/puzzle/[puzzleId]/profile";

export default function FormPage() {
    const [pictureUrl, setPictureUrl] = useState('')
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        text: '',
        pictureFile: null as unknown as File
    })
    const [showPreview, setShowPreview] = useState(false)
    const modalRef = useRef(null);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        showPreview ? (modalRef.current as any).showModal() : (modalRef.current as any).close();
    }, [showPreview]);

    const handleClose = () => {
        setShowPreview(false)
    }

    const handleESC = (event: any) => {
        event.preventDefault();
        handleClose();
    }

    const generatedLink = formData.id ? (
        <Link href={`/puzzle/${formData.id}`} ><span className="hover:text-red-400">{`${process.env.NEXT_PUBLIC_SITE_URL}/puzzle/${formData.id}`}</span></Link>
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
            picture: await file2Base64(formData.pictureFile)
        } as PuzzleData

        savePuzzle(dataToSave).then((uuid) => {
            setFormData({ ...formData, id: uuid })
        })
    }

    const allDataExistsForPreview = formData.pictureFile && formData.text && formData.title

    return (
        <>
            <dialog ref={modalRef} id="my_modal_3" className="modal" onCancel={handleESC}>
                <div className="modal-box w-11/12 max-w-full">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setShowPreview(false)}>✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Preview</h3>
                    {showPreview ? (<Profile title={formData.title} text={formData.text} imgUrl={pictureUrl} noLink={true} noFullHeight={true} />) : (<></>)}
                </div>
            </dialog>
            <div className="hero m-auto">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    {/* {pictureUrl ? (
                        <div className="text-center lg:text-left w-full">
                            <div className="flex justify-center px-4 text-xl">Preview</div>
                            <div className="flex justify-center px-4 pt-4">
                                {pictureElement}
                            </div>
                        </div>
                    ) : null} */}

                    <div className="card shrink-0 w-full max-w-xl shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit}>

                            <div className="form-control">
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    onChange={(event) => {
                                        if (!event || !event.target || !event.target.files || !event.target.files[0]) {
                                            setFormData({ ...formData, pictureFile: null as unknown as File })
                                            setPictureUrl('')
                                        } else {
                                            const file = event.target.files[0]
                                            setFormData({ ...formData, pictureFile: file })
                                            setPictureUrl(URL.createObjectURL(file))
                                        }
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
                            {allDataExistsForPreview ?
                                (
                                    <div className="form-control mt-6">
                                        <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); setShowPreview(true) }}>Preview</button>
                                    </div>
                                ) :
                                (
                                    <></>
                                )
                            }


                            {formData.id ? (<p className="text-center">Generated URL: {generatedLink}</p>) : (<></>)}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Generate puzzle link</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
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