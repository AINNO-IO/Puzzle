import type { Metadata } from "next";
import PuzzleComponent from "./puzzle-component";
import fs from 'fs';

export const metadata: Metadata = {
  title: "Solve puzzle",
  description: "Solve this puzzle",
};

export default async function Puzzle({ params }: { params: { puzzleId: string } }) {

  const path = `${process.env.FILE_STORAGE_PATH}/${params.puzzleId}`
  console.log(path)
  const title = fs.readFileSync(path+'/title.txt',  { encoding: 'utf8', flag: 'r' })
  const text = fs.readFileSync(path+'/text.txt', { encoding: 'utf8', flag: 'r' })
  const picture = fs.readFileSync(path+'/picture.png', { encoding: 'utf8', flag: 'r' })

  console.log(title)
  console.log(text)
  console.log(picture)
  
 console.log(params.puzzleId)
  return (
    <main className="mt-20">
      <p>{title}</p>
      <p>{text}</p>
      <p>{picture}</p>
      <PuzzleComponent imgUrl={'https://assets.codepen.io/2574552/Mona_Lisa.jpg'}/>
    </main>
  );
}
