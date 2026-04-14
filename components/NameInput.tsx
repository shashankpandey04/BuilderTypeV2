"use client";

type NameInputProps = {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  isRunning: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function NameInput({
  name,
  onNameChange,
  onSubmit,
  isRunning,
  inputRef,
}: NameInputProps) {
  const hasName = name.trim().length >= 2;

  return (
    <div className="rounded-2xl border border-white/12 bg-[rgb(22,29,38)]/86 p-6 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.85)] backdrop-blur">
      <h2 className="text-2xl font-semibold tracking-tight text-white">Pilot Profile</h2>
      <p className="mt-2 text-sm text-white/70">Enter your name, then press Enter to choose Paragraph or Code.</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          value={name}
          maxLength={20}
          onChange={(event) => onNameChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && hasName && !isRunning) {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Builder name"
          disabled={isRunning}
          className="h-12 w-full rounded-xl border border-white/15 bg-[rgb(22,29,38)] px-4 text-lg text-white outline-none ring-0 placeholder:text-white/45 transition focus:border-[rgb(191,128,255)]"
        />
      </div>

      {!hasName ? (
        <p className="mt-4 text-xs text-white/55">Enter at least 2 characters in your name to continue.</p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasName || isRunning}
          className="h-12 min-w-36 rounded-xl bg-white px-5 text-sm font-semibold uppercase tracking-wide text-[rgb(22,29,38)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
