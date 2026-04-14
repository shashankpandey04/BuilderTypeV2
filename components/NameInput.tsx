"use client";

type NameInputProps = {
  name: string;
  onNameChange: (value: string) => void;
  hasParagraphSelected: boolean;
  onSelectParagraph: () => void;
  onSelectCode: () => void;
  onStartParagraph: () => void;
  isRunning: boolean;
};

export function NameInput({
  name,
  onNameChange,
  hasParagraphSelected,
  onSelectParagraph,
  onSelectCode,
  onStartParagraph,
  isRunning,
}: NameInputProps) {
  const hasName = name.trim().length >= 2;
  const canStartParagraph = hasName && hasParagraphSelected && !isRunning;

  return (
    <div className="rounded-2xl border border-white/12 bg-[rgb(22,29,38)]/86 p-6 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.85)] backdrop-blur">
      <h2 className="text-2xl font-semibold tracking-tight text-white">Pilot Profile</h2>
      <p className="mt-2 text-sm text-white/70">Enter your name, choose Paragraph or Code, then launch the 45 second sprint.</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          maxLength={20}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Builder name"
          disabled={isRunning}
          className="h-12 w-full rounded-xl border border-white/15 bg-[rgb(22,29,38)] px-4 text-lg text-white outline-none ring-0 placeholder:text-white/45 transition focus:border-[rgb(191,128,255)]"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">Challenge</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onSelectParagraph}
            disabled={!hasName || isRunning}
            className={`h-14 rounded-lg border px-4 text-left transition ${
              hasParagraphSelected
                ? "border-[rgb(191,128,255)] bg-[rgb(191,128,255)] text-[rgb(22,29,38)]"
                : "border-white/15 bg-[rgb(22,29,38)] text-white/80 hover:border-[rgb(191,128,255)]"
            } disabled:cursor-not-allowed disabled:opacity-45`}
          >
            <div className="text-sm font-semibold">Paragraph</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">Freeform typing</div>
          </button>

          <button
            type="button"
            onClick={onSelectCode}
            disabled={!hasName || isRunning}
            className="h-14 rounded-lg border border-white/15 bg-[rgb(22,29,38)] px-4 text-left text-white/80 transition hover:border-[rgb(191,128,255)] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <div className="text-sm font-semibold">Code</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">Choose a language</div>
          </button>
        </div>
      </div>

      {!hasName ? (
        <p className="mt-4 text-xs text-white/55">Enter at least 2 characters in your name to unlock challenge selection.</p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onStartParagraph}
          disabled={!canStartParagraph}
          className="h-12 min-w-36 rounded-xl bg-white px-5 text-sm font-semibold uppercase tracking-wide text-[rgb(22,29,38)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start Paragraph
        </button>
      </div>
    </div>
  );
}
