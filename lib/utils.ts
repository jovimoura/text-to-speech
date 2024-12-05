import { clsx, type ClassValue } from "clsx"
import internal from "stream"
import { twMerge } from "tailwind-merge"

// update the second link to your prod url
const prodUrl = process.env.URL as string || `http://localhost:3000`

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function streamToBuffer(
  stream: internal.Readable
): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === 'production' ? `${prodUrl}${path}` : `https://sevenlabz.vercel.app${path}`
}
