'use server'
import { randomUUID } from 'crypto';
import fs from 'fs';

export default async function SaveData(formData: any): Promise<string> {
    if (formData.id) {
        const deletionUrl = `${process.env.FILE_STORAGE_PATH}/${formData.id}`
        try {
            fs.rmSync(deletionUrl, { recursive: true })
        } catch (ex) {
            console.log(`Failed to delete ${deletionUrl}. Skipping`, ex)
        }
    }
    console.log(formData)
    const UUID = randomUUID()
    const path = `${process.env.FILE_STORAGE_PATH}/${UUID}`
    console.log(path)
    fs.mkdirSync(path, { recursive: true })

    fs.writeFileSync(`${path}/title.txt`, formData.title);
    fs.writeFileSync(`${path}/text.txt`, formData.text);
    fs.writeFileSync(`${path}/picture.png`, formData.picture);

    return UUID
}