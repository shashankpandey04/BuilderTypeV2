"use client";

import { useEffect } from "react";
import type { CodeLanguage } from "@/lib/codeSnippets";

type CodeLanguageModalProps = {
  open: boolean;
  selectedLanguage: CodeLanguage | null;
  onSelectLanguage: (language: CodeLanguage) => void;
  onClose: () => void;
};

const languageOptions: Array<{ value: CodeLanguage; label: string; description: string }> = [
  { value: "java", label: "Java", description: "Structured OOP practice" },
  { value: "cpp", label: "C++", description: "Fast systems syntax" },
  { value: "python", label: "Python", description: "Readable and clean" },
  { value: "javascript", label: "JavaScript", description: "Web and scripting" },
  { value: "go", label: "Go", description: "Compact backend style" },
  { value: "rust", label: "Rust", description: "Advanced memory-safe typing" },
  { value: "php", label: "PHP", description: "Practical web syntax" },
  { value: "csharp", label: "C#", description: "Enterprise and tooling" },
];

const languageLabels: Record<CodeLanguage, string> = {
  java: "Java",
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
  go: "Go",
  rust: "Rust",
  php: "PHP",
  csharp: "C#",
};

export function CodeLanguageModal({
  open,
  selectedLanguage,
  onSelectLanguage,
  onClose,
}: CodeLanguageModalProps) {
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
      <div className="w-full max-w-3xl rounded-3xl border border-white/12 bg-[rgb(22,29,38)] p-6 shadow-[0_30px_110px_-70px_rgba(0,0,0,0.92)] md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[rgb(191,128,255)]">Code Challenge</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Choose a language</h3>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Pick a language, then start the code round. Formatting, indentation, and line breaks all count.
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

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {languageOptions.map((option) => {
            const isSelected = selectedLanguage === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelectLanguage(option.value)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  isSelected
                    ? "border-[rgb(191,128,255)] bg-[rgb(191,128,255)] text-[rgb(22,29,38)]"
                    : "border-white/12 bg-[rgb(22,29,38)] text-white/80 hover:border-[rgb(191,128,255)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isSelected
                        ? "border-[rgb(22,29,38)]/15 bg-[rgb(22,29,38)]/10 text-[rgb(22,29,38)]"
                        : "border-white/12 bg-white/8 text-[rgb(191,128,255)]"
                    }`}
                    aria-hidden="true"
                  >
                    <LanguageIcon language={option.value} selected={isSelected} />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] opacity-70">{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">
            {selectedLanguage ? `Selected: ${languageLabels[selectedLanguage]}. Starting now.` : "Select a language to start."}
          </p>
        </div>
      </div>
    </div>
  );
}

type LanguageIconProps = {
  language: CodeLanguage;
  selected: boolean;
};

function LanguageIcon({ language, selected }: LanguageIconProps) {
  const stroke = selected ? "rgb(22,29,38)" : "rgb(191,128,255)";
  const fill = selected ? "rgb(22,29,38)" : "none";

  switch (language) {
    case "java":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 16c0 1.7 1.8 3 4 3s4-1.3 4-3" />
          <path d="M9 11c0-1.5 1-2.5 1-4 0-1 .6-1.7 1.6-2.5" />
          <path d="M14 11c0-1.5-1-2.5-1-4 0-1-.6-1.7-1.6-2.5" />
          <path d="M7.5 17.5h9" />
        </svg>
      );
    case "cpp":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7 4.5 12 9 17" />
          <path d="M15 7 19.5 12 15 17" />
          <path d="M11 9.5h2" />
          <path d="M11 14.5h2" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7.5c0-1 .8-1.8 1.8-1.8h4.4c1 0 1.8.8 1.8 1.8V12H10c-1.1 0-2 .9-2 2v2.5c0 1 .8 1.8 1.8 1.8h4.4c1 0 1.8-.8 1.8-1.8v-1.5" />
          <circle cx="10.4" cy="8.4" r="0.6" fill={stroke} stroke="none" />
          <circle cx="13.6" cy="15.6" r="0.6" fill={stroke} stroke="none" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <path d="M10 9.5v5.2c0 1-.5 1.6-1.5 1.6-.5 0-1-.2-1.5-.5" />
          <path d="M15 10.2c-.4-.4-1-.7-1.7-.7-.9 0-1.6.5-1.6 1.3 0 1.9 3.2 1.2 3.2 3.5 0 1.2-.9 2-2.3 2-.9 0-1.7-.3-2.3-.9" />
        </svg>
      );
    case "go":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 12h5.5" />
          <path d="M7.5 9.5 10 12l-2.5 2.5" />
          <path d="M13.2 10.3h5.3" />
          <path d="M15.5 7.8v5" />
          <path d="M18.5 7.8v5" />
        </svg>
      );
    case "rust":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill={fill} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7.2" />
          <path d="M9.2 9.2h5.6v5.6H9.2z" />
          <path d="M12 7.2v2.2" />
          <path d="M12 14.6v2.2" />
          <path d="M7.2 12h2.2" />
          <path d="M14.6 12h2.2" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="8" ry="5.5" />
          <path d="M8.2 14.4 9 9.6h1.8c1.1 0 1.8.5 1.6 1.5-.2 1.2-1.1 1.8-2.2 1.8H9.5" />
          <path d="M13.8 14.4 14.6 9.6h1.8c1.1 0 1.8.5 1.6 1.5-.2 1.2-1.1 1.8-2.2 1.8h-1.1" />
        </svg>
      );
    case "csharp":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M9 9.8c.6-.9 1.6-1.4 2.7-1.4 1 0 1.7.3 2.3 1" />
          <path d="M8.7 12h6.6" />
          <path d="M7.7 10.7v2.6" />
          <path d="M6.4 12h2.6" />
        </svg>
      );
    default:
      return null;
  }
}
