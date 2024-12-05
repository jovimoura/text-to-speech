'use server'

import { prisma } from "@/lib/prisma"
import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT as string);

export async function getHistoryFiles(clerkId: string) {
  const historyFiles = await prisma.audio.findMany({
    where: {
      clerkId
    }
  })
  return historyFiles
}

export async function handleDownloadAudioFile(fileId: string) {
  const storage = new Storage(client);

  const result = storage.getFileDownload(
    process.env.APPWRITE_STORAGE as string,
    fileId
  )

  return result
}