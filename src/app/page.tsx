'use server'
import PuzzleData from '@/puzzle/puzzle-data'
import { getPuzzleData } from '@/puzzle/puzzle-repository'
import { redirect } from 'next/navigation'

export default async function Home() {
  const puzzles: PuzzleData[] = await getPuzzleData()
  if (puzzles) {
    const i = Math.floor(Math.random() * puzzles.length)
    redirect(`/puzzle/${puzzles[i].id}`)
  } else {
    redirect(`/admin/upload`)
  }
  return (
    <main className="">

    </main>
  )
}
