'use client'
import { deletePuzzle } from "@/puzzle/puzzle-repository"
import { useRouter } from "next/navigation"

export default function Actions({ puzzleId }: { puzzleId: string }) {
    const router = useRouter()
    return (
        <>
            <button className="btn btn-secondary btn-md" onClick={async () => { await deletePuzzle(puzzleId); router.refresh() }}>Delete</button>
        </>
    )
}