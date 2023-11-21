import type { Metadata } from "next";
import PuzzleComponent from "./puzzle-component";
import fs from 'fs';
import Image from "next/image";

export const metadata: Metadata = {
  title: "Solve puzzle",
  description: "Solve this puzzle",
};

export default async function Puzzle({ params }: { params: { puzzleId: string } }) {

  const path = `${process.env.FILE_STORAGE_PATH}/${params.puzzleId}`
  console.log(path)
  const title = fs.readFileSync(path+'/title.txt',  { encoding: 'utf8', flag: 'r' })
  const text = fs.readFileSync(path+'/text.txt', { encoding: 'utf8', flag: 'r' })
  const picture = fs.readFileSync(path+'/picture.base64', { encoding: 'utf8', flag: 'r' })

  console.log(title)
  console.log(text)
  console.log(picture)
  
 console.log(params.puzzleId)
  return (
    <main className="">
      <PuzzleComponent imgUrl={picture}/>
    </main>
  );
}
