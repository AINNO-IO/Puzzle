import PuzzleData from '@/puzzle/puzzle-data'
import { getPuzzleData } from '@/puzzle/puzzle-repository'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  'use server'
  console.log(`Executing the Client Public Home Page`)
  const puzzles: PuzzleData[] = await getPuzzleData()
  if (puzzles && puzzles.length) {
    const i = Math.floor(Math.random() * puzzles.length)
    console.log(`Found ${puzzles.length} puzzles. Redirecting to /puzzle/${puzzles[i].id}`)
    redirect(`/puzzle/${puzzles[i].id}`)
  } else {
    console.log(`No puzzles found. Redirecting to Admin`)
    redirect(`/admin/upload`)
  }
}