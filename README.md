Installing prisma

npm i -D prisma

npx prisma init

npx prisma generate

npx prisma db push

```js
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

```prisma


```


```js
export async function streamToBuffer(stream: internal.Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = []

  for await (const chunk of chunks) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks)
}

```

````js
import { elevenlabs } from "@/lib/elevenlabs";
import { streamToBuffer } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
import { Client, Storage } from 'appwrite'
import { prisma } from "@/lib/prisma";

type ResultStorage = {
  $id: string;
  bucketId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
      .setProject(process.env.APPWRITE_PROJECT as string)

const storage = new Storage(client)

export async function POST (req: Request) {
  const { userId } = await auth()
  const { text, voice } = await req.json()

  if(!userId) return new NextResponse('Unauthorized', { status: 500 })

    const audio = await elevenlabs.generate({
      voice,
      text,
      model_id: 'eleven_multilingual_v2'
    })

    const audioBuffer = await streamToBuffer(audio)

    const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })
    const audioFile = new File([audioBlob], `${uuidv4()}.mp3` ,{ type: 'audio/mpeg' })

    try {
      //LETS CONNECT WITH DB AND APPWRITE
      const result: ResultStorage = await storage.createFile(
        process.env.APPWRITE_STORAGE as string,
        uuidv4(),
        audioFile
      )

      const newAudio = await prisma.audio.create({
        data: {
          audioId: result.$id,
          bucketId: result.bucketId,
          permissions: result.$permissions,
          name: result.name,
          signature: result.signature,
          mimeType: result.mimeType,
          sizeOriginal: result.sizeOriginal,
          chunksTotal: result.chunksTotal,
          chunksUploaded: result.chunksUploaded,
          text,
          clerkId: userId,
        }
      })

      return new NextResponse(audioBuffer, {
        headers: {
          "Content-type": "audio/mpeg"
        }
      })
  
    } catch (error) {
      return new NextResponse('Error generating audio', { status: 500 })
    }
}
```