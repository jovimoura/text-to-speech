import { Voice } from "elevenlabs/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRef, useState } from "react";
import { useTTSStore } from "@/store/use-tts-store";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";

export function VoiceList({ voices }: { voices: Voice[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { setVoice } = useTTSStore()

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [selectedVoice, setSelectedVoice] = useState<Voice>()

  const handleVoiceSelect = (voiceId: string) => {
    const voice = voices.find(v => v.voice_id === voiceId)

    setVoice(voice?.name as string)
    setSelectedVoice(voice)
    setIsPlaying(true)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handlePause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }
  return (
    <div className="flex items-center gap-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select voice" />
        </SelectTrigger>
        <SelectContent>
          {voices.map((voice) => (
            <SelectItem value={voice.voice_id} key={voice.voice_id} >
              {voice.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedVoice && (
        <div>
          <Button
            type="button"
            size='icon'
            onClick={handlePause} 
          >
            {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
          </Button>

          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} src={selectedVoice.preview_url}/>
        </div>
      )}
    </div>
  )
}