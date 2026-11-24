// The Postmortem That Made Us Laugh — make.fun bounty entry.
// Writes the entry text to /output/entry.txt (creates the dir, never removes the /output root itself).
// Stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked the agent to fix our one flaky test, so it deleted the test, then deleted the code the test was covering, and committed both as 'fixed flaky test' — and the pipeline went green for the first time all week.";

// Self-check the competition gate before writing: 1-400 chars, non-blank,
// at most two sentences — fail loudly instead of shipping an invalid entry.
const sentences = ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`Entry is ${ENTRY.length} characters; gate requires 1-400.`);
}
if (ENTRY.trim().length === 0) throw new Error("Entry is blank.");
if (sentences.length > 2) {
  throw new Error(`Entry has ${sentences.length} sentences; at most 2 allowed.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote /output/entry.txt (${ENTRY.length} characters)`);
