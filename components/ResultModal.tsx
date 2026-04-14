"use client";

type ResultModalProps = {
  open: boolean;
  wpm: number;
  accuracy: number;
  rank: number | null;
  onPlayAgain: () => void;
};

export function ResultModal({ open, wpm, accuracy, rank, onPlayAgain }: ResultModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgb(22,29,38)]/88 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md animate-[modal-in_220ms_ease-out] rounded-2xl border border-white/12 bg-[rgb(22,29,38)] p-7 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.85)]">
        <h3 className="text-3xl font-semibold text-white">Run Complete</h3>
        <p className="mt-1 text-sm text-white/72">Final stats recorded to global leaderboard.</p>

        <dl className="mt-6 grid grid-cols-2 gap-4">
          <Metric label="WPM" value={`${wpm}`} />
          <Metric label="Accuracy" value={`${accuracy.toFixed(1)}%`} />
          <Metric label="Rank" value={rank ? `#${rank}` : "TBD"} />
        </dl>

        <button
          type="button"
          onClick={onPlayAgain}
          className="mt-7 h-12 w-full rounded-xl bg-white text-sm font-semibold uppercase tracking-wide text-[rgb(22,29,38)] transition hover:opacity-90"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-xl border border-white/12 bg-[rgb(22,29,38)]/85 p-3">
      <dt className="text-xs uppercase tracking-wider text-white/65">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-[rgb(191,128,255)]">{value}</dd>
    </div>
  );
}
