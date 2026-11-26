'use client';

import { useState } from 'react';
import { AlertTriangle, RotateCcw, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOKENS = ['0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '2', '4'] as const;

export function ChaosDial() {
  const [tightness, setTightness] = useState(38);
  const infeasible = tightness >= 88;
  const allowed = Math.max(3, Math.round(14 - tightness / 9));
  const lo = (0.34 - tightness / 700).toFixed(3);
  const hi = (0.5 - tightness / 520).toFixed(3);

  return (
    <section className="relative overflow-hidden border-t border-border-subtle bg-bg-canvas px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="vx-frame-card grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="p-6 sm:p-8">
            <span className="vx-mono inline-flex items-center gap-2 text-cobalt-600 dark:text-cobalt-300">
              <Zap className="h-3.5 w-3.5" />
              break the decoder
            </span>
            <h2 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.08] tracking-[-0.038em] text-ink-primary sm:text-[2.25rem]">
              Tighten the spec. Watch the tokens <span className="vx-marker">disappear.</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-secondary">
              Drag the dial. Every step narrows the interval the decoder can sample from, until the
              preflight gate refuses the spec before a single token is spent.
            </p>
            <label htmlFor="chaos-range" className="vx-mono mt-7 block text-ink-muted">
              constraint tightness · {tightness}%
            </label>
            <input
              id="chaos-range"
              type="range"
              min={0}
              max={100}
              value={tightness}
              onChange={(event) => setTightness(Number(event.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border-subtle accent-[#2145ff]"
              style={{
                background: `linear-gradient(to right, #2145ff 0%, ${infeasible ? '#e0455b' : '#bdb9ff'} ${tightness}%, var(--vt-subtle) ${tightness}%, var(--vt-subtle) 100%)`,
              }}
            />
            <div className="mt-2 flex justify-between font-mono text-[9.5px] text-ink-muted">
              <span>loose</span>
              <span>impossible</span>
            </div>
          </div>

          <div className="border-t border-border-subtle bg-bg-subtle/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] text-ink-muted">
              <span>allowed numeric prefixes</span>
              <span className={cn(infeasible ? 'text-verify-fail' : 'text-verify-pass')}>
                {infeasible ? 'preflight: UNSAT' : `SAT · ${allowed} / 14 open`}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5" aria-hidden>
              {TOKENS.map((token, index) => {
                const open = index < allowed && !infeasible;
                return (
                  <span
                    key={`${token}-${index}`}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-[10px] border font-mono text-[12px] transition-all duration-300',
                      open
                        ? 'border-[#bdb9ff]/60 bg-white text-ink-primary shadow-[var(--vt-shadow-card)] dark:bg-white/10'
                        : 'border-verify-fail/20 bg-verify-fail/[0.06] text-verify-fail/45 line-through dark:bg-verify-fail/10',
                    )}
                  >
                    {token}
                  </span>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border-subtle pt-4 font-mono text-[10px]">
              <div>
                <p className="text-ink-muted">HC4 interval</p>
                <p className="mt-1 text-[13px] font-semibold text-ink-primary">
                  [{lo}, {hi}]
                </p>
              </div>
              <div>
                <p className="text-ink-muted">cut cost</p>
                <p className="mt-1 text-[13px] font-semibold text-ink-primary">3.9 µs</p>
              </div>
            </div>

            {infeasible ? (
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-verify-fail/25 bg-verify-fail/[0.06] px-4 py-3">
                <AlertTriangle className="h-4 w-4 shrink-0 text-verify-fail" />
                <p className="flex-1 text-[12px] leading-relaxed text-ink-secondary">
                  No satisfying assignment. Smallest fix: raise the volatility ceiling to 0.18.
                </p>
                <button
                  type="button"
                  onClick={() => setTightness(80)}
                  className="vx-btn inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1.5 font-mono text-[10px] text-ink-primary"
                >
                  <RotateCcw className="h-3 w-3" /> apply fix
                </button>
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-2 text-[12px] text-ink-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-verify-pass" />
                Every visible token can still be sampled. The rest are masked, not guessed.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
