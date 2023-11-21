'use client'

import Image from "next/image"

export default function Profile({ imgUrl, title, text }: { imgUrl: string, title: string, text: string }) {

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{text.split('\n').map((element) => (<>{element} <br /></>))}</p>
                </div>
                <div className="mr-10 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto text-center">
                    <Image
                        className=" rounded-2xl"
                        width={200}
                        height={160}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                        style={{ height: '100%', width: '100%' }}
                        src={imgUrl}
                        alt='Puzzle picture'
                    />
                </div>
            </div>
        </div>
    );
}
