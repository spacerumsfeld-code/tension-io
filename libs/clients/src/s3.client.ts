import crypto from 'crypto'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Resource } from 'sst'

const client = new S3Client({})

export const uploadImageFromUrl = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        console.error('Failed to fetch image:', response.statusText)
        throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    const imageBuffer = await response.arrayBuffer()

    const key = `cover-images/${crypto.randomUUID()}.png`

    const command = new PutObjectCommand({
        Bucket: Resource.Bucket.name,
        Key: key,
        Body: Buffer.from(imageBuffer),
        ContentType: 'image/png',
    })

    await client.send(command)

    return `https://${Resource.Bucket.name}.s3.amazonaws.com/${key}`
}

export const uploadAudioFromBuffer = async (buffer: Buffer) => {
    if (!buffer) return null

    const key = `narration.mp3`

    const command = new PutObjectCommand({
        Bucket: Resource.Bucket.name,
        Key: key,
        Body: buffer,
        ContentType: 'audio/mpeg',
    })

    await client.send(command)

    return `https://${Resource.Bucket.name}.s3.amazonaws.com/${key}`
}
