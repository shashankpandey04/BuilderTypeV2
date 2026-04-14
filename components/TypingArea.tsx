"use client";

import { useMemo } from "react";
import type { CodeLanguage } from "@/lib/codeSnippets";

type GamePhase = "idle" | "countdown" | "running" | "finished";
type TypingMode = "paragraph" | "code";

type TypingAreaProps = {
  text: string;
  input: string;
  timeLeft: number;
  countdownLeft: number;
  wpm: number;
  accuracy: number;
  phase: GamePhase;
  mode: TypingMode | null;
  language: CodeLanguage;
  onInputChange: (value: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
};

export function TypingArea({
  text,
  input,
  timeLeft,
  countdownLeft,
  wpm,
  accuracy,
  phase,
  mode,
  language,
  onInputChange,
  inputRef,
}: TypingAreaProps) {
  const isRunning = phase === "running";
  const isCountdown = phase === "countdown";
  const isCodeMode = mode === "code";

  const languageLabel =
    language === "cpp"
      ? "C++"
      : language === "csharp"
        ? "C#"
        : language === "javascript"
          ? "JavaScript"
          : language === "go"
            ? "Go"
            : language === "rust"
              ? "Rust"
              : language === "php"
                ? "PHP"
                : language === "java"
                  ? "Java"
                  : "Python";

  const makeCursorMarker = (key: string) => (
    <span
      key={key}
      className="inline-block h-[1.15em] w-[0.6ch] translate-y-[0.12em] rounded-sm bg-[rgb(191,128,255)]/45 align-baseline"
    />
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isCodeMode || phase !== "running" || event.key !== "Tab") {
      return;
    }

    event.preventDefault();

    const target = event.currentTarget;
    const selectionStart = target.selectionStart ?? input.length;
    const selectionEnd = target.selectionEnd ?? input.length;
    const indent = "    ";
    const nextValue = `${input.slice(0, selectionStart)}${indent}${input.slice(selectionEnd)}`;

    onInputChange(nextValue);

    requestAnimationFrame(() => {
      target.selectionStart = selectionStart + indent.length;
      target.selectionEnd = selectionStart + indent.length;
    });
  };

  const renderedText = useMemo(() => {
    if (isCodeMode) {
      const lines = text.split("\n");
      let cursorInserted = false;
      let globalIndex = 0;

      return (
        <div className="font-mono text-base leading-7 tracking-normal whitespace-pre-wrap text-white/90">
          {lines.map((line, lineIndex) => {
            const lineStartIndex = globalIndex;
            const lineEndIndex = lineStartIndex + line.length;
            const lineNodes: React.ReactNode[] = [];
            const cursorOnThisLine = !cursorInserted && input.length >= lineStartIndex && input.length <= lineEndIndex;

            if (cursorOnThisLine && input.length === lineStartIndex) {
              lineNodes.push(makeCursorMarker(`cursor-line-${lineIndex}-start`));
              cursorInserted = true;
            }

            for (let charIndex = 0; charIndex < line.length; charIndex += 1) {
              const char = line[charIndex];
              let className = "text-white/40";

              if (globalIndex < input.length) {
                className = input[globalIndex] === char ? "text-white" : "text-[rgb(191,128,255)]/45";
              }

              lineNodes.push(
                <span key={`${lineIndex}-${charIndex}-${char}`} className={`${className} transition-colors`}>
                  {char}
                </span>,
              );

              globalIndex += 1;

              if (!cursorInserted && globalIndex === input.length) {
                lineNodes.push(makeCursorMarker(`cursor-line-${lineIndex}-char-${charIndex}`));
                cursorInserted = true;
              }
            }

            if (lineIndex < lines.length - 1) {
              globalIndex += 1;
            }

            return (
              <div key={`line-${lineIndex}`} className="min-h-7">
                {lineNodes.length > 0
                  ? lineNodes
                  : cursorOnThisLine && !cursorInserted
                    ? makeCursorMarker(`cursor-line-${lineIndex}-empty`)
                    : <span key={`spacer-line-${lineIndex}`} className="inline-block h-[1.15em] w-[0.6ch]" />}
              </div>
            );
          })}

          {!cursorInserted ? makeCursorMarker("cursor-fallback") : null}
        </div>
      );
    }

    return text.split("").map((char, index) => {
      let className = "text-white/40";

      if (index < input.length) {
        className = input[index] === char ? "text-white" : "text-[rgb(191,128,255)]/45";
      }

      const isCursor = isRunning && index === input.length;

      return (
        <span
          key={`${char}-${index}`}
          className={`${className} transition-colors ${
            isCursor ? "rounded-sm bg-[rgb(191,128,255)]/18 underline decoration-[rgb(191,128,255)] decoration-2 underline-offset-4" : ""
          }`}
        >
          {char}
        </span>
      );
    });
  }, [input, isRunning, text]);

  return (
    <section className="relative rounded-2xl border border-white/12 bg-[rgb(22,29,38)]/88 p-6">
      <textarea
        ref={inputRef}
        value={input}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        disabled={phase === "idle" || phase === "finished"}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
        aria-label="Typing input"
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <StatPill label="Time" value={`${timeLeft}s`} />
        {isCountdown ? <StatPill label="Start" value={`${countdownLeft}`} /> : null}
        <StatPill label="WPM" value={`${wpm}`} />
        <StatPill label="Accuracy" value={`${accuracy.toFixed(1)}%`} />
        <StatPill label="Mode" value={isCodeMode ? `Code - ${languageLabel}` : "Paragraph"} />
      </div>

      {isCodeMode ? (
        <p className="mb-4 text-xs uppercase tracking-[0.18em] text-[rgb(191,128,255)]">
          Code mode: formatting, indentation, and line breaks all count. Tab inserts 4 spaces.
        </p>
      ) : null}

      <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[rgb(22,29,38)]/96 p-5">
        {isCountdown ? (
          <div className="grid min-h-65 place-items-center text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[rgb(191,128,255)]">Get ready</p>
              <div className="mt-4 text-7xl font-bold text-white sm:text-8xl">{countdownLeft}</div>
              <p className="mt-3 text-sm text-white/68">The typing lane opens in a moment.</p>
            </div>
          </div>
        ) : isRunning ? (
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="w-full text-left text-2xl leading-relaxed tracking-wide"
          >
            {renderedText}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="w-full rounded-xl border border-dashed border-white/12 bg-[rgb(22,29,38)]/88 p-8 text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[rgb(191,128,255)]">Ready</p>
            <p className="mt-3 text-xl text-white/90">Start the round, then type any character to launch the countdown.</p>
            <p className="mt-2 text-sm text-white/58">The paragraph stays hidden until the sprint begins.</p>
          </button>
        )}
      </div>
    </section>
  );
}

type StatPillProps = {
  label: string;
  value: string;
};

function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-full border border-white/12 bg-[rgb(22,29,38)]/95 px-4 py-2">
      <span className="text-xs uppercase tracking-wider text-white/65">{label}</span>
      <span className="ml-2 font-mono text-sm text-[rgb(191,128,255)]">{value}</span>
    </div>
  );
}
