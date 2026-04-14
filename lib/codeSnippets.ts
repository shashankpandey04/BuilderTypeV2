export type CodeLanguage = "java" | "cpp" | "python" | "javascript" | "go" | "rust" | "php" | "csharp";

export const codeSnippetsByLanguage: Record<CodeLanguage, string[]> = {
  java: [
    `import java.util.*;

public class BuilderStats {
  private static class Run {
    final String name;
    final int wpm;
    final double accuracy;

    Run(String name, int wpm, double accuracy) {
      this.name = name;
      this.wpm = wpm;
      this.accuracy = accuracy;
    }
  }

  public static List<Run> topRuns(List<Run> runs, int minAccuracy, int limit) {
    List<Run> filtered = new ArrayList<>();
    for (Run run : runs) {
      if (run.accuracy >= minAccuracy) {
        filtered.add(run);
      }
    }

    filtered.sort((a, b) -> {
      if (a.wpm != b.wpm) {
        return Integer.compare(b.wpm, a.wpm);
      }
      return Double.compare(b.accuracy, a.accuracy);
    });

    return filtered.subList(0, Math.min(limit, filtered.size()));
  }
}`,
    `import java.util.*;

public class PrefixAnalyzer {
  public static Map<Character, Integer> countFirstLetters(List<String> names) {
    Map<Character, Integer> counts = new HashMap<>();
    for (String name : names) {
      if (name == null || name.isBlank()) {
        continue;
      }
      char key = Character.toUpperCase(name.charAt(0));
      counts.put(key, counts.getOrDefault(key, 0) + 1);
    }
    return counts;
  }

  public static String report(Map<Character, Integer> counts) {
    List<Character> keys = new ArrayList<>(counts.keySet());
    Collections.sort(keys);
    StringBuilder output = new StringBuilder();
    for (Character key : keys) {
      output.append(key)
        .append(" => ")
        .append(counts.get(key))
        .append(" entries")
        .append(System.lineSeparator());
    }
    return output.toString();
  }
}`,
    `import java.time.*;
import java.util.*;

public class SessionWindow {
  public static List<String> activeUsers(
      Map<String, LocalDateTime> seenAt,
      LocalDateTime now,
      int timeoutMinutes
  ) {
    List<String> active = new ArrayList<>();
    for (Map.Entry<String, LocalDateTime> entry : seenAt.entrySet()) {
      long idle = Duration.between(entry.getValue(), now).toMinutes();
      if (idle <= timeoutMinutes) {
        active.add(entry.getKey());
      }
    }
    Collections.sort(active);
    return active;
  }

  public static void main(String[] args) {
    Map<String, LocalDateTime> seen = new HashMap<>();
    seen.put("Ava", LocalDateTime.now().minusMinutes(2));
    seen.put("Noah", LocalDateTime.now().minusMinutes(18));
    seen.put("Mia", LocalDateTime.now().minusMinutes(7));
    System.out.println(activeUsers(seen, LocalDateTime.now(), 10));
  }
}`,
    `import java.util.*;

public class SlidingAverage {
  public static List<Double> compute(List<Integer> values, int windowSize) {
    List<Double> result = new ArrayList<>();
    if (windowSize <= 0 || values.isEmpty()) {
      return result;
    }

    long sum = 0;
    for (int i = 0; i < values.size(); i++) {
      sum += values.get(i);
      if (i >= windowSize) {
        sum -= values.get(i - windowSize);
      }
      if (i >= windowSize - 1) {
        result.add(sum / (double) windowSize);
      }
    }

    return result;
  }

  public static void print(List<Double> averages) {
    for (double avg : averages) {
      System.out.printf(Locale.US, "%.2f%n", avg);
    }
  }
}`,
    `import java.util.*;

public class RetryQueue {
  private final Queue<String> queue = new ArrayDeque<>();
  private final Map<String, Integer> attempts = new HashMap<>();
  private final int maxAttempts;

  public RetryQueue(int maxAttempts) {
    this.maxAttempts = maxAttempts;
  }

  public void push(String taskId) {
    queue.offer(taskId);
    attempts.putIfAbsent(taskId, 0);
  }

  public Optional<String> next() {
    while (!queue.isEmpty()) {
      String task = queue.poll();
      int count = attempts.getOrDefault(task, 0);
      if (count < maxAttempts) {
        attempts.put(task, count + 1);
        return Optional.of(task);
      }
    }
    return Optional.empty();
  }
}`,
  ],
  cpp: [
    `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Run {
  std::string name;
  int wpm;
  double accuracy;
};

std::vector<Run> topRuns(std::vector<Run> runs, double minAccuracy, std::size_t limit) {
  runs.erase(
    std::remove_if(runs.begin(), runs.end(), [=](const Run& r) {
      return r.accuracy < minAccuracy;
    }),
    runs.end()
  );

  std::sort(runs.begin(), runs.end(), [](const Run& a, const Run& b) {
    if (a.wpm != b.wpm) return a.wpm > b.wpm;
    return a.accuracy > b.accuracy;
  });

  if (runs.size() > limit) runs.resize(limit);
  return runs;
}`,
    `#include <iostream>
#include <numeric>
#include <vector>

std::vector<double> movingAverage(const std::vector<int>& values, int window) {
  std::vector<double> result;
  if (window <= 0 || values.empty()) return result;

  long long sum = 0;
  for (std::size_t i = 0; i < values.size(); ++i) {
    sum += values[i];
    if (static_cast<int>(i) >= window) {
      sum -= values[i - window];
    }
    if (static_cast<int>(i) >= window - 1) {
      result.push_back(static_cast<double>(sum) / window);
    }
  }

  return result;
}

int main() {
  std::vector<int> data = {8, 11, 14, 15, 20, 18, 17, 24};
  auto avg = movingAverage(data, 3);
  for (double v : avg) std::cout << v << "\n";
}`,
    `#include <chrono>
#include <iostream>
#include <map>
#include <string>
#include <vector>

std::vector<std::string> activeUsers(
  const std::map<std::string, std::chrono::system_clock::time_point>& seen,
  int timeoutSeconds
) {
  std::vector<std::string> result;
  auto now = std::chrono::system_clock::now();

  for (const auto& [name, timestamp] : seen) {
    auto idle = std::chrono::duration_cast<std::chrono::seconds>(now - timestamp).count();
    if (idle <= timeoutSeconds) {
      result.push_back(name);
    }
  }

  return result;
}

int main() {
  std::map<std::string, std::chrono::system_clock::time_point> seen;
  seen["Ava"] = std::chrono::system_clock::now() - std::chrono::seconds(8);
  seen["Noah"] = std::chrono::system_clock::now() - std::chrono::seconds(30);
}`,
    `#include <iostream>
#include <queue>
#include <string>
#include <unordered_map>

class RetryQueue {
 public:
  explicit RetryQueue(int maxAttempts) : maxAttempts_(maxAttempts) {}

  void push(const std::string& id) {
    queue_.push(id);
    attempts_.emplace(id, 0);
  }

  bool next(std::string& out) {
    while (!queue_.empty()) {
      std::string id = queue_.front();
      queue_.pop();
      if (attempts_[id] < maxAttempts_) {
        attempts_[id] += 1;
        out = id;
        return true;
      }
    }
    return false;
  }

 private:
  int maxAttempts_;
  std::queue<std::string> queue_;
  std::unordered_map<std::string, int> attempts_;
};`,
    `#include <cctype>
#include <iostream>
#include <string>
#include <unordered_map>

std::unordered_map<char, int> firstLetterCounts(const std::vector<std::string>& names) {
  std::unordered_map<char, int> counts;
  for (const auto& name : names) {
    if (name.empty()) continue;
    char key = static_cast<char>(std::toupper(name.front()));
    counts[key] += 1;
  }
  return counts;
}

int main() {
  std::vector<std::string> names = {"anna", "alex", "bob", "brian", "bianca", "claire"};
  auto counts = firstLetterCounts(names);
  for (const auto& [key, value] : counts) {
    std::cout << key << " => " << value << "\n";
  }
}`,
  ],
  python: [
    `from dataclasses import dataclass
from typing import Iterable


@dataclass
class Run:
    name: str
    wpm: int
    accuracy: float


def top_runs(runs: Iterable[Run], min_accuracy: float, limit: int = 10) -> list[Run]:
    filtered = [run for run in runs if run.accuracy >= min_accuracy]
    filtered.sort(key=lambda run: (run.wpm, run.accuracy), reverse=True)
    return filtered[:limit]


if __name__ == "__main__":
    sample = [
        Run("ava", 108, 97.4),
        Run("noah", 102, 99.1),
        Run("liam", 108, 95.8),
    ]
    print(top_runs(sample, min_accuracy=96.0, limit=2))`,
    `from collections import defaultdict


def first_letter_counts(names: list[str]) -> dict[str, int]:
    counts: dict[str, int] = defaultdict(int)
    for name in names:
        if not name:
            continue
        counts[name[0].upper()] += 1
    return dict(counts)


def build_report(counts: dict[str, int]) -> str:
    lines = []
    for key in sorted(counts):
        lines.append(f"{key} => {counts[key]} entries")
    return "\n".join(lines)


players = ["anna", "alice", "bob", "brad", "claire", "cory", "charlie"]
print(build_report(first_letter_counts(players)))`,
    `from datetime import datetime, timedelta


def active_users(seen_at: dict[str, datetime], timeout_seconds: int) -> list[str]:
    now = datetime.utcnow()
    result: list[str] = []
    for user, timestamp in seen_at.items():
        idle_for = (now - timestamp).total_seconds()
        if idle_for <= timeout_seconds:
            result.append(user)
    return sorted(result)


seen = {
    "ava": datetime.utcnow() - timedelta(seconds=9),
    "noah": datetime.utcnow() - timedelta(seconds=42),
    "mia": datetime.utcnow() - timedelta(seconds=16),
}

print(active_users(seen, timeout_seconds=20))`,
    `from collections import deque


class RetryQueue:
    def __init__(self, max_attempts: int) -> None:
        self.max_attempts = max_attempts
        self.queue: deque[str] = deque()
        self.attempts: dict[str, int] = {}

    def push(self, task_id: str) -> None:
        self.queue.append(task_id)
        self.attempts.setdefault(task_id, 0)

    def next(self) -> str | None:
        while self.queue:
            task_id = self.queue.popleft()
            if self.attempts[task_id] < self.max_attempts:
                self.attempts[task_id] += 1
                return task_id
        return None`,
    `from itertools import islice


def moving_average(values: list[int], window: int) -> list[float]:
    if window <= 0 or len(values) < window:
        return []

    result: list[float] = []
    running = sum(values[:window])
    result.append(running / window)

    for index in range(window, len(values)):
        running += values[index]
        running -= values[index - window]
        result.append(running / window)

    return result


series = [8, 11, 14, 15, 20, 18, 17, 24, 22, 19]
print(list(islice(moving_average(series, 3), 0, 6)))`,
  ],
  javascript: [
    `const runs = [
  { name: "ava", wpm: 108, accuracy: 97.4 },
  { name: "noah", wpm: 102, accuracy: 99.1 },
  { name: "liam", wpm: 108, accuracy: 95.8 },
];

function topRuns(items, minAccuracy, limit = 10) {
  return items
    .filter((run) => run.accuracy >= minAccuracy)
    .sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy)
    .slice(0, limit);
}

console.log(topRuns(runs, 96));`,
    `function countFirstLetters(names) {
  const counts = new Map();
  for (const name of names) {
    if (!name) continue;
    const key = name[0].toUpperCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Object.fromEntries([...counts.entries()].sort());
}

console.log(countFirstLetters(["anna", "alex", "bob", "brian", "bianca"]));`,
    `const seen = new Map([
  ["ava", Date.now() - 8000],
  ["noah", Date.now() - 30000],
  ["mia", Date.now() - 16000],
]);

function activeUsers(entries, timeoutMs) {
  return [...entries.entries()]
    .filter(([, timestamp]) => Date.now() - timestamp <= timeoutMs)
    .map(([name]) => name)
    .sort();
}

console.log(activeUsers(seen, 20000));`,
  ],
  go: [
    `package main

import (
  "fmt"
  "sort"
)

type Run struct {
  Name     string
  WPM      int
  Accuracy float64
}

func topRuns(runs []Run, minAccuracy float64, limit int) []Run {
  filtered := make([]Run, 0, len(runs))
  for _, run := range runs {
    if run.Accuracy >= minAccuracy {
      filtered = append(filtered, run)
    }
  }
  sort.Slice(filtered, func(i, j int) bool {
    if filtered[i].WPM != filtered[j].WPM {
      return filtered[i].WPM > filtered[j].WPM
    }
    return filtered[i].Accuracy > filtered[j].Accuracy
  })
  if len(filtered) > limit {
    filtered = filtered[:limit]
  }
  return filtered
}

func main() {
  fmt.Println(topRuns([]Run{{"ava", 108, 97.4}, {"noah", 102, 99.1}}, 96, 10))
}`,
    `package main

import (
  "fmt"
  "sort"
  "unicode"
)

func countFirstLetters(names []string) map[rune]int {
  counts := make(map[rune]int)
  for _, name := range names {
    if len(name) == 0 {
      continue
    }
    key := unicode.ToUpper(rune(name[0]))
    counts[key]++
  }
  return counts
}

func main() {
  counts := countFirstLetters([]string{"anna", "alex", "bob", "brian", "bianca"})
  keys := make([]rune, 0, len(counts))
  for key := range counts {
    keys = append(keys, key)
  }
  sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
  for _, key := range keys {
    fmt.Printf("%c => %d\n", key, counts[key])
  }
}`,
    `package main

import (
  "fmt"
  "time"
)

func activeUsers(seen map[string]time.Time, timeout time.Duration) []string {
  now := time.Now()
  active := make([]string, 0, len(seen))
  for name, timestamp := range seen {
    if now.Sub(timestamp) <= timeout {
      active = append(active, name)
    }
  }
  return active
}

func main() {
  seen := map[string]time.Time{
    "ava":  time.Now().Add(-8 * time.Second),
    "noah": time.Now().Add(-30 * time.Second),
    "mia":  time.Now().Add(-16 * time.Second),
  }
  fmt.Println(activeUsers(seen, 20*time.Second))
}`,
  ],
  rust: [
    `#[derive(Clone)]
struct Run {
    name: String,
    wpm: u32,
    accuracy: f32,
}

fn top_runs(mut runs: Vec<Run>, min_accuracy: f32, limit: usize) -> Vec<Run> {
    runs.retain(|run| run.accuracy >= min_accuracy);
    runs.sort_by(|a, b| b.wpm.cmp(&a.wpm).then_with(|| b.accuracy.partial_cmp(&a.accuracy).unwrap()));
    runs.truncate(limit);
    runs
}

fn main() {
    let runs = vec![
        Run { name: "ava".into(), wpm: 108, accuracy: 97.4 },
        Run { name: "noah".into(), wpm: 102, accuracy: 99.1 },
    ];
    println!("{}", top_runs(runs, 96.0, 10).len());
}`,
    `use std::collections::HashMap;

fn count_first_letters(names: &[&str]) -> HashMap<char, usize> {
    let mut counts = HashMap::new();
    for name in names {
        if let Some(first) = name.chars().next() {
            *counts.entry(first.to_ascii_uppercase()).or_insert(0) += 1;
        }
    }
    counts
}

fn main() {
    let counts = count_first_letters(&["anna", "alex", "bob", "brian", "bianca"]);
    println!("{:?}", counts);
}`,
    `use std::time::{Duration, Instant};

fn active_users(seen: &[(String, Instant)], timeout: Duration) -> Vec<String> {
    seen.iter()
        .filter(|(_, seen_at)| seen_at.elapsed().unwrap_or_default() <= timeout)
        .map(|(name, _)| name.clone())
        .collect()
}

fn main() {
    let seen = vec![("ava".into(), Instant::now()), ("noah".into(), Instant::now())];
    println!("{}", active_users(&seen, Duration::from_secs(20)).len());
}`,
  ],
  php: [
    `<?php

$runs = [
  ["name" => "ava", "wpm" => 108, "accuracy" => 97.4],
  ["name" => "noah", "wpm" => 102, "accuracy" => 99.1],
  ["name" => "liam", "wpm" => 108, "accuracy" => 95.8],
];

usort($runs, function ($a, $b) {
  return $b["wpm"] <=> $a["wpm"] ?: $b["accuracy"] <=> $a["accuracy"];
});

print_r(array_slice($runs, 0, 2));`,
    `<?php

function countFirstLetters(array $names): array {
  $counts = [];
  foreach ($names as $name) {
    if ($name === '') continue;
    $key = strtoupper($name[0]);
    $counts[$key] = ($counts[$key] ?? 0) + 1;
  }
  ksort($counts);
  return $counts;
}

print_r(countFirstLetters(["anna", "alex", "bob", "brian", "bianca"]));`,
    `<?php

function activeUsers(array $seenAt, int $timeoutSeconds): array {
  $now = time();
  $active = [];
  foreach ($seenAt as $name => $timestamp) {
    if (($now - $timestamp) <= $timeoutSeconds) {
      $active[] = $name;
    }
  }
  sort($active);
  return $active;
}

print_r(activeUsers([
  "ava" => time() - 8,
  "noah" => time() - 30,
  "mia" => time() - 16,
], 20));`,
  ],
  csharp: [
    `using System;
using System.Collections.Generic;
using System.Linq;

record Run(string Name, int Wpm, double Accuracy);

static List<Run> TopRuns(IEnumerable<Run> runs, double minAccuracy, int limit)
{
    return runs
        .Where(run => run.Accuracy >= minAccuracy)
        .OrderByDescending(run => run.Wpm)
        .ThenByDescending(run => run.Accuracy)
        .Take(limit)
        .ToList();
}`,
    `using System;
using System.Collections.Generic;
using System.Linq;

static Dictionary<char, int> CountFirstLetters(IEnumerable<string> names)
{
    return names
        .Where(name => !string.IsNullOrWhiteSpace(name))
        .GroupBy(name => char.ToUpperInvariant(name[0]))
        .ToDictionary(group => group.Key, group => group.Count());
}`,
    `using System;
using System.Collections.Generic;

static List<string> ActiveUsers(Dictionary<string, DateTime> seenAt, TimeSpan timeout)
{
    var now = DateTime.UtcNow;
    var active = new List<string>();
    foreach (var pair in seenAt)
    {
        if (now - pair.Value <= timeout)
        {
            active.Add(pair.Key);
        }
    }
    active.Sort();
    return active;
}`,
  ],
};
