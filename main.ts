// Fortune in a Pot — a one-line fortune for the houseplant on the windowsill.
// Node 22, standard library only. No files read, no network, no Chrome.
// The fortune is a literal; the program only writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FORTUNE =
  'By spring you will outgrow this windowsill, and the sun will start arriving early just to see you.';

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

// The gate the scorer checks: 1 to 120 characters, not only whitespace.
// Refuse to hand in a fortune the gate would refuse.
function checkFortune(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`fortune must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error('fortune must not be only whitespace');
  }
}

function deliver(): void {
  checkFortune(FORTUNE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'entry.txt'), FORTUNE, 'utf8');
}

deliver();
