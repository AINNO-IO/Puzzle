'use client'

import Image from "next/image"
import Link from "next/link";

export default function Profile(
    { imgUrl, title, text, noLink, noFullHeight }:
        { imgUrl: string, title: string, text: string, noLink?: boolean, noFullHeight?: boolean }
) {
    return (
        <div className={`hero ${noFullHeight ? '' : 'min-h-screen'}`}>
            <div className="card lg:card-side bg-base-100 shadow-xl m-10">
                <figure>
                    <Image
                        width={100}
                        height={100}
                        style={{ maxHeight: '600px', width: '600px' }}
                        src={imgUrl}
                        alt='Puzzle picture'
                    />
                </figure>
                <div className="card-body lg:w-1/2 break-words">
                    <h2 className="card-title">{title}</h2>
                    <p>{text.split('\n').map((element, index) => (<span key={index}>{element} <br /></span>))}</p>
                    <div className="card-actions justify-end mt-5">
                        {noLink === true ? (
                            <button className="btn btn-primary">New puzzle!</button>
                        ) : (
                            <Link href='/' passHref><button className="btn btn-primary">New puzzle!</button></Link>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
