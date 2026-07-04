export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-[0.35] dark:opacity-[0.18]" />
      <div className="bg-gradient-radial absolute -top-40 start-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl dark:opacity-40" />
      <div className="bg-gradient-radial-accent absolute top-[30%] -end-32 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl dark:opacity-25" />
      <div className="bg-gradient-radial-muted absolute -bottom-20 -start-20 h-[320px] w-[320px] rounded-full opacity-50 blur-3xl dark:opacity-30" />
    </div>
  )
}
