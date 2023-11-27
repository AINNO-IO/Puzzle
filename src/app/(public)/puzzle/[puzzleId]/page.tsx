import fs from 'fs';
import type { Metadata } from "next";
import PuzzleComponent from "./puzzle-component";

export const metadata: Metadata = {
  title: "Solve puzzle and see who is there!",
  description: "Solve this puzzle to see what this puzzle hides!",
};

export default async function Puzzle({ params }: { params: { puzzleId: string } }) {

  const path = `${process.env.FILE_STORAGE_PATH}/${params.puzzleId}`
  const title = fs.readFileSync(path + '/title.txt', { encoding: 'utf8', flag: 'r' })
  const text = fs.readFileSync(path + '/text.txt', { encoding: 'utf8', flag: 'r' })
  const picture = fs.readFileSync(path + '/picture.base64', { encoding: 'utf8', flag: 'r' })

  console.log(`Executing puzzle with id: ${params.puzzleId}`)
  return (
    <main>
      <PuzzleComponent imgUrl={picture} title={title} text={text} />
    </main>
  );
}
