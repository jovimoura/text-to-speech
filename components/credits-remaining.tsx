import { CircularProgress } from "./circular-progress";

export function CreditsRemaining({ credits, maxCredits }: { credits: number, maxCredits: number }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <CircularProgress value={credits} maxValue={maxCredits} />
      <span className="text-sm">{credits.toLocaleString()} credits remaining</span>
    </div> 
  )
}