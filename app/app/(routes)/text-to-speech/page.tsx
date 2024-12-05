import { TextToSpeech } from "@/components/text-to-speech"
import { elevenlabs } from "@/lib/elevenlabs"
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  const { userId } = await auth()
  const voicesRes = await elevenlabs.voices.getAll()
  const voices = voicesRes.voices

  // voices here

  return (
    <main className="flex flex-col items-center min-h-screen overflow-y-hidden">
      <TextToSpeech voices={voices} />
    </main>
  )
}