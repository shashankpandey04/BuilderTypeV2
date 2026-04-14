"use client";

import { useEffect } from "react";

type ChallengeChoiceModalProps = {
  open: boolean;
  onSelectParagraph: () => void;
  onSelectCode: () => void;
  onClose: () => void;
};

export function ChallengeChoiceModal({ open, onSelectParagraph, onSelectCode, onClose }: ChallengeChoiceModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgb(22,29,38)]/88 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/12 bg-[rgb(22,29,38)] p-6 shadow-[0_30px_110px_-70px_rgba(0,0,0,0.92)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[rgb(191,128,255)]">Choose challenge</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Paragraph or Code?</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Paragraph starts immediately. Code opens a language picker and starts as soon as you choose one.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:border-[rgb(191,128,255)] hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onSelectParagraph}
            className="rounded-2xl border border-white/12 bg-[rgb(22,29,38)] px-5 py-5 text-left text-white/85 transition hover:border-[rgb(191,128,255)] hover:bg-[rgb(191,128,255)] hover:text-[rgb(22,29,38)]"
          >
            <div className="text-sm font-semibold">Paragraph</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">Starts immediately</div>
          </button>

          <button
            type="button"
            onClick={onSelectCode}
            className="rounded-2xl border border-white/12 bg-[rgb(22,29,38)] px-5 py-5 text-left text-white/85 transition hover:border-[rgb(191,128,255)] hover:bg-[rgb(191,128,255)] hover:text-[rgb(22,29,38)]"
          >
            <div className="text-sm font-semibold">Code</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">Pick a language first</div>
          </button>
        </div>
      </div>
    </div>
  );
}
