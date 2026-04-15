"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Leaderboard, type LeaderboardEntry } from "@/components/Leaderboard";
import { getSocket } from "@/lib/socket";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleLeaderboardUpdate = (nextEntries: LeaderboardEntry[]) => {
      setEntries(nextEntries);
    };

    socket.on("leaderboard:update", handleLeaderboardUpdate);

    return () => {
      socket.off("leaderboard:update", handleLeaderboardUpdate);
    };
  }, []);

  return (
    <main className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex max-w-350 flex-col rounded-3xl border border-white/12 bg-[rgb(22,29,38)]/88 p-5 shadow-[0_40px_140px_-80px_rgba(0,0,0,0.92)] backdrop-blur md:p-8">
        <Leaderboard entries={entries} />

        <footer className="mt-6 border-t border-white/12 pt-4 text-sm text-white/70">
          <Link href="/" className="text-[rgb(191,128,255)] transition hover:text-white">
            Back to game screen
          </Link>
        </footer>
      </div>
    </main>
  );
}