/**
 * Growth, the mascot, saying one line: used where it hosts a quiz or a game.
 * The frame names are the rendered poses in /public/mascot.
 */
export type GrowthFrame = "idle1" | "idle2" | "wave1" | "wave2" | "cheer" | "jump" | "point" | "peek" | "hit";

export function GrowthSays({ frame = "idle1", children, className = "", compact = false }: { frame?: GrowthFrame; children: React.ReactNode; className?: string; compact?: boolean }) {
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/mascot/${frame}.webp`} alt="" draggable={false} className={`${compact ? "h-16" : "h-20 sm:h-24"} w-auto shrink-0 select-none`} />
      <p className="relative mb-3 rounded-2xl rounded-es-sm border border-mint bg-white px-4 py-2.5 text-start text-sm font-medium leading-relaxed text-ink shadow-sm">{children}</p>
    </div>
  );
}
