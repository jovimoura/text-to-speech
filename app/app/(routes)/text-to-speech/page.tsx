import { TextToSpeech } from "@/components/text-to-speech"
import { elevenlabs } from "@/lib/elevenlabs"
import { auth } from "@clerk/nextjs/server"
import { getHistoryFiles } from "../../actions"

export default async function Page() {
  const { userId } = await auth()
  const voicesRes = await elevenlabs.voices.getAll()
  const voices = voicesRes.voices

  const history = (await getHistoryFiles(userId!)).filter(history => history.text && history.text.length > 0)
  if (!voices) return <div>no voices</div>

  return (
    <main className="flex flex-col items-center min-h-screen overflow-y-hidden">
      <TextToSpeech voices={voices} history={history} />
    </main>
  )
}