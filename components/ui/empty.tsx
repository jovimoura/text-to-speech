export function Empty({ label }: { label: string }) {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <p className="text-muted-foreground italic text-sm text-center">{label}</p>
    </div>
  )
}