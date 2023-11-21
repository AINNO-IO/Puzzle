'use server'
import PuzzleData from '@/puzzle/puzzle-data';
import { randomUUID } from 'crypto';
import fs from 'fs';

export async function deletePuzzle(id: string): Promise<void> {
  console.log(`Removing folder: ${id}`)
  const fileToRemove = `${process.env.FILE_STORAGE_PATH}/${id}`

  try {
    fs.rmSync(fileToRemove, { recursive: true })
  } catch (err) {
    console.error(`Failed to remove folder ${id}`, err)
  }
}

export async function getPuzzleData(): Promise<PuzzleData[]> {
  const storageUrl = `${process.env.FILE_STORAGE_PATH}`

  let fileNamesInDir
  try {
    fileNamesInDir = fs.readdirSync(storageUrl)
  } catch (err) {
    console.error(`Failed to read dir ${storageUrl}`, err)
    return []
  }

  const result: PuzzleData[] = []

  for (const fileName of fileNamesInDir) {
    const dir = `${storageUrl}/${fileName}`
    const stats = fs.lstatSync(dir)
    const isDirectory = stats.isDirectory()
    if (!isDirectory) {
      continue
    }
    const title: string = fs.readFileSync(`${dir}/title.txt`).toString('utf-8')
    const text: string = fs.readFileSync(`${dir}/text.txt`).toString('utf-8')
    const picture: string = fs.readFileSync(`${dir}/picture.base64`).toString('utf-8')
    result.push({ id: fileName, title, text, picture, created: stats.birthtime.getMilliseconds() })
  }

  return result.sort((a, b) => a.created - b.created)
}

export default async function savePuzzle(data: PuzzleData): Promise<string> {
  if (data.id) {
    const deletionUrl = `${process.env.FILE_STORAGE_PATH}/${data.id}`
    try {
      fs.rmSync(deletionUrl, { recursive: true })
    } catch (ex) {
      console.log(`Failed to delete ${deletionUrl}. Skipping`, ex)
    }
  }
  console.log(data)
  const UUID = randomUUID()
  const path = `${process.env.FILE_STORAGE_PATH}/${UUID}`
  console.log(path)
  fs.mkdirSync(path, { recursive: true })

  fs.writeFileSync(`${path}/title.txt`, data.title);
  fs.writeFileSync(`${path}/text.txt`, data.text);
  fs.writeFileSync(`${path}/picture.base64`, data.picture);

  return UUID
}