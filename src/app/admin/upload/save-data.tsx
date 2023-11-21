'use server'
import { randomUUID } from 'crypto';
import fs from 'fs';

export interface DataToSave {
    id: string,
    title: string,
    text: string,
    picture: {
        name: string,
        body: string
    }
}

export default async function SaveData(data: DataToSave): Promise<string> {
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
    fs.writeFileSync(`${path}/picture.base64`, data.picture.body);

    return UUID
}