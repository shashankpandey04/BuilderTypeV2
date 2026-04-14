"use client";

export type LeaderboardEntry = {
  name: string;
  wpm: number;
  accuracy: number;
  timestamp: string;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  variant?: "compact" | "display";
};

export function Leaderboard({ entries, variant = "compact" }: LeaderboardProps) {
  const isDisplay = variant === "display";

  return (
    <aside
      className={
        isDisplay
          ? "rounded-3xl border border-white/12 bg-[rgb(22,29,38)]/86 p-5 shadow-[0_34px_110px_-70px_rgba(0,0,0,0.9)] backdrop-blur md:p-8"
          : "h-fit rounded-2xl border border-white/12 bg-[rgb(22,29,38)]/86 p-6"
      }
    >
      <div className={isDisplay ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between" : ""}>
        <div>
          <p className={isDisplay ? "text-xs uppercase tracking-[0.3em] text-[rgb(191,128,255)]" : "text-xs uppercase tracking-wide text-[rgb(191,128,255)]"}>
            {isDisplay ? "BuilderRush v2" : "Live booth ranking"}
          </p>
          <h2 className={isDisplay ? "mt-2 text-4xl font-bold tracking-tight text-white md:text-6xl" : "mt-1 text-xl font-semibold text-white"}>
            Global Top 10
          </h2>
          <p className={isDisplay ? "mt-3 max-w-2xl text-sm text-white/72 md:text-base" : "mt-1 text-xs uppercase tracking-wide text-white/60"}>
            {isDisplay
              ? "The fastest scoreboards from every connected system appear here instantly."
              : "Live booth ranking"}
          </p>
        </div>

        {isDisplay ? (
          <div className="rounded-2xl border border-white/12 bg-[rgb(22,29,38)]/90 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-white/65">Sync Status</p>
            <p className="mt-1 text-lg font-semibold text-[rgb(191,128,255)]">Live</p>
          </div>
        ) : null}
      </div>

      <div className={isDisplay ? "mt-6 overflow-hidden rounded-3xl border border-white/12" : "mt-4 overflow-hidden rounded-xl border border-white/12"}>
        <table className={isDisplay ? "w-full table-fixed text-left" : "w-full text-left text-sm"}>
          <thead className={isDisplay ? "bg-[rgb(22,29,38)]/98 text-white/65" : "bg-[rgb(22,29,38)]/96 text-white/65"}>
            <tr className={isDisplay ? "text-sm uppercase tracking-[0.18em]" : ""}>
              <th className={isDisplay ? "w-16 px-5 py-4" : "px-3 py-2"}>#</th>
              <th className={isDisplay ? "px-5 py-4" : "px-3 py-2"}>Name</th>
              <th className={isDisplay ? "w-32 px-5 py-4 text-right" : "px-3 py-2 text-right"}>WPM</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={3} className={isDisplay ? "px-5 py-12 text-center text-white/45" : "px-3 py-8 text-center text-white/45"}>
                  No runs yet.
                </td>
              </tr>
            ) : (
              entries.map((entry, index) => (
                <tr
                  key={`${entry.name}-${entry.timestamp}-${index}`}
                  className={
                    isDisplay
                      ? "border-t border-white/12 text-white transition hover:bg-white/4"
                      : "border-t border-white/12 text-white/95"
                  }
                >
                  <td className={isDisplay ? "px-5 py-5 font-mono text-2xl text-[rgb(191,128,255)]" : "px-3 py-2 font-mono text-[rgb(191,128,255)]"}>
                    {index + 1}
                  </td>
                  <td className={isDisplay ? "px-5 py-5 text-xl font-medium text-white" : "px-3 py-2 max-w-40 truncate"}>
                    <span className={isDisplay ? "block truncate" : "truncate block"}>{entry.name}</span>
                  </td>
                  <td className={isDisplay ? "px-5 py-5 text-right font-mono text-3xl font-semibold text-[rgb(191,128,255)]" : "px-3 py-2 text-right font-mono text-[rgb(191,128,255)]"}>
                    {entry.wpm}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
