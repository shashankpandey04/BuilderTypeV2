"use client";

export type LeaderboardEntry = {
  name: string;
  wpm: number;
  accuracy: number;
  timestamp: string;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
};

const MEDALS = ["🥇", "🥈", "🥉"];

export function Leaderboard({ entries }: LeaderboardProps) {
  const unique = Object.values(
    entries.reduce((acc, entry) => {
      const key = entry.name.toLowerCase();
      if (!acc[key] || acc[key].wpm < entry.wpm) {
        acc[key] = entry;
      }
      return acc;
    }, {} as Record<string, LeaderboardEntry>)
  );

  const top20 = unique
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 20);

  const top3 = top20.slice(0, 3);
  const rest = top20.slice(3);

  return (
    <section className="rounded-3xl bg-[rgb(22,29,38)]/90 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[rgb(191,128,255)]">
            BuilderRush v2
          </p>
          <h2 className="mt-1 text-3xl font-bold text-white">
            Global Top 20
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          Live
        </div>
      </div>
      <div className="mt-4 max-w-2xl text-sm text-white/60 leading-relaxed">
        <p className="text-white/80 font-medium">
          Your speed. Your precision. Your BuilderType.
        </p>
        <p className="mt-1">
          Connect with builders in real time. Launch a{" "}
          <span className="text-white font-medium">45-second sprint</span>, submit your run, 
          and watch the leaderboard update instantly across every connected screen.
        </p>
      </div>
      {top3.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {top3.map((entry, i) => (
            <div
              key={`${entry.name}-${i}`}
              className="rounded-xl bg-white/5 p-4 flex flex-col items-center text-center"
            >
              <div className="text-2xl">{MEDALS[i]}</div>
              <div className="mt-1 text-white font-semibold truncate w-full">
                {entry.name}
              </div>
              <div className="mt-1 text-lg font-mono text-[rgb(191,128,255)]">
                {entry.wpm} WPM
              </div>
              <div className="text-xs text-white/50">
                {entry.accuracy}% accuracy
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        {rest.length === 0 ? (
          <p className="py-10 text-center text-sm text-white/40">
            No runs yet. Be the first.
          </p>
        ) : (
          rest.map((entry, i) => {
            const rank = i + 4;

            return (
              <div
                key={`${entry.name}-${entry.timestamp}-${i}`}
                className="flex items-center gap-4 py-3 px-2 rounded-lg border-b border-white/5 hover:bg-white/5 transition"
              >
                <div className="w-10 text-center font-mono text-white/40">
                  {rank}
                </div>
                <div className="flex-1 truncate text-white/80 font-medium">
                  {entry.name}
                </div>
                <div className="w-20 text-right font-mono text-white font-semibold">
                  {entry.wpm}
                </div>
                <div className="w-20 text-right text-white/50 text-sm">
                  {entry.accuracy}%
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}