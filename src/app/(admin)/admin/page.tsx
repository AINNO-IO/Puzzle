import Image from 'next/image'
import type { Metadata } from 'next'

import PuzzleData from '@/puzzle/puzzle-data';
import { getPuzzleData } from '@/puzzle/puzzle-repository';
import Actions from './actions';

export const metadata: Metadata = {
  title: 'All puzzles',
  description: 'Here you can see all puzzles',
}
export default async function AdminView() {
  const puzzleData: PuzzleData[] = await getPuzzleData()
  return (
    <main className="mt-20">

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Picture</th>
              <th>Title</th>
              <th>Text</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {puzzleData.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.id}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-24 h-24">
                        <Image src={item.picture} height={24} width={24} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.title}
                </td>
                <td>{item.text.split('\n').map((element) => (<>{element} <br /></>))}</td>
                <th>
                  <Actions puzzleId={item.id}/>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



    </main>
  )
}
