'use client'

import { Voice } from "elevenlabs/api";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { VoiceList } from "./voice-list";
import { Button } from "./ui/button";
import { DownloadIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTTSStore } from "@/store/use-tts-store";
import React, { useState } from "react";
import axios from 'axios'

interface Props {
  voices: Voice[]
}

export function TextToSpeech({ voices }: Props) {
  const router = useRouter()
  const { setText, setVoice, text, voice } = useTTSStore()

  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setAudioUrl(null)
    setIsLoading(true)

    try {
      const res = await axios.post(
        '/api/generate',
        {
          text,
          voice
        },
        {
          responseType: 'blob'
        }
      )

      router.refresh()

      const audioBlob = res.data
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
    } catch (error) {
      // console
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a')
      a.href = audioUrl
      a.download = 'tts_audio.mp3'
      a.click()
    }
  }


  return (
    <div className="max-w-7xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Textarea 
          maxLength={5000}
          placeholder="Start typing here or paste any text to turn into lifelike speech..."
          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent shadow-none p-4 md:p-8 resize-none"
        />
        <div className="w-1/2 border-1 p-4 md:p-8 flex flex-col gap-4">
          <div className="space-y-2">
            <Label>Voices</Label>
            <VoiceList voices={voices} />
          </div>
          <Button type="submit" disabled={isLoading || !text || !voice}>
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <span>Generating speech</span>
                <Loader2Icon className="animate-spin size-5" />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span>Generate speech</span>
                <SparklesIcon className="size-5" />
              </div>
            )}
          </Button>

          {audioUrl && (
            <div className="flex items-center space-x-3 mt-8">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>

              <Button onClick={handleDownload} size='icon'>
                <DownloadIcon className="size-5" />
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}