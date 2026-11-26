'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Play,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { heroStats } from '@/lib/site';
import { cn } from '@/lib/utils';
import { StippleField } from '@/components/landing/stipple-field';
import { Magnetic } from '@/components/site/magnetic';

type Mode = 'json' | 'vexx';

const WEIGHTS = [
  { asset: 'AAPL', good: 0.4, bad: 0.5 },
  { asset: 'MSFT', good: 0.35, bad: 0.45 },
  { asset: 'NVDA', good: 0.25, bad: 0.3 },
];

function SpecCode() {
  return (
    <pre className="whitespace-pre font-mono text-[10.5px] leading-[1.75] text-slate-300 sm:text-[11.5px] lg:text-[12px]">
      <span className="text-slate-400">@verified_schema()</span>
      {'\n'}
      <span className="text-sky-300">def</span> <span className="text-amber-200">portfolio</span>
      <span className="text-slate-400">(</span>p<span className="text-slate-400">:</span>{' '}
      <span className="text-emerald-300">Portfolio</span>
      <span className="text-slate-400">):</span>
      {'\n  '}
      <span className="text-slate-400"># structure</span>
      {'\n  '}require(keys_subset(p.weights, ASSETS))
      {'\n  '}
      <span className="text-slate-400"># cross-field algebra</span>
      {'\n  '}require(sum(p.weights.values()) == 1.0, tol=1e-6)
      {'\n  '}require(forall(p.weights.values(), lambda w: (0.05 &lt;= w) &amp; (w &lt;= 0.50)))
      {'\n\n  '}
      <span className="text-slate-400"># zero degrees of freedom → splice, never sample</span>
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.expected_return == dot(p.weights, RETURNS))
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.volatility == sqrt(quad_form(p.weights, COV)))
      {'\n  '}
      <span className="text-emerald-300">derive</span>(p.sharpe == (p.expected_return - 0.04) / p.volatility)
    </pre>
  );
}

function JsonLine({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: 'pass' | 'fail' | 'cobalt';
}) {
  const color =
    accent === 'pass'
      ? 'text-emerald-300'
      : accent === 'fail'
        ? 'text-rose-300'
        : accent === 'cobalt'
          ? 'text-sky-300'
          : 'text-slate-200';
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-slate-400">&quot;{label}&quot;:</span>{' '}
      <span className={`font-medium ${color}`}>{value}</span>
      <span className="text-slate-400">,</span>
    </div>
  );
}

function HeroDemo({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const reduce = useReducedMotion();
  const isVexx = mode === 'vexx';

  return (
    <div className="vx-ink-island relative overflow-hidden rounded-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="ml-1 truncate font-mono text-[10.5px] text-slate-400 sm:text-[11.5px]">
            portfolio_spec.py
          </span>
        </div>

        <div role="tablist" aria-label="Decoding mode" className="flex items-center rounded-full bg-white/5 p-0.5">
          <button
            role="tab"
            aria-selected={!isVexx}
            onClick={() => setMode('json')}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors sm:px-3 sm:text-[10.5px]',
              !isVexx ? 'bg-rose-500/20 text-rose-200' : 'text-slate-400 hover:text-slate-200',
            )}
          >
            JSON mode
          </button>
          <button
            role="tab"
            aria-selected={isVexx}
            onClick={() => setMode('vexx')}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors sm:px-3 sm:text-[10.5px]',
              isVexx ? 'bg-lime-300/20 text-lime-200' : 'text-slate-400 hover:text-slate-200',
            )}
          >
            Vexx 2.1
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative border-b border-white/10 p-3.5 sm:p-4 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] tracking-[0.1em] text-slate-400">
            <span>compiled spec</span>
            <span>VIR · vexx2.1</span>
          </div>
          <div
            tabIndex={0}
            role="region"
            aria-label="Compiled specification source"
            className="no-scrollbar max-h-[228px] overflow-x-auto overflow-y-auto [mask-image:linear-gradient(to_right,#000_90%,transparent)] lg:[mask-image:none]"
          >
            <SpecCode />
          </div>
        </div>

        <div className="relative p-3.5 sm:p-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[9.5px] tracking-[0.1em] text-slate-400">
            <span>decoded stream</span>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px]',
                isVexx ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300',
              )}
            >
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-current" />
              </span>
              {isVexx ? 'verified' : 'unverified'}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="font-mono text-[11px] leading-[1.9] sm:text-[12px]"
            >
              <div className="text-slate-400">{'{'}</div>
              <div className="pl-3">
                <div className="text-slate-400">
                  &quot;weights&quot;: <span className="text-slate-400">{'{'}</span>
                </div>
                {WEIGHTS.map((w) => (
                  <div key={w.asset} className="flex items-baseline justify-between gap-4 pl-3">
                    <span className="text-slate-400">
                      &quot;{w.asset}&quot;:{' '}
                      <span className={isVexx ? 'text-emerald-300' : 'text-rose-300'}>
                        {(isVexx ? w.good : w.bad).toFixed(2)}
                      </span>
                      <span className="text-slate-400">,</span>
                    </span>
                    {isVexx && w.asset === 'NVDA' && (
                      <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-sky-300">
                        contracted
                      </span>
                    )}
                  </div>
                ))}
                <div className="text-slate-400">{'}'},</div>
                <JsonLine label="expected_return" value={isVexx ? '0.1615' : '0.21'} accent={isVexx ? 'pass' : 'fail'} />
                <JsonLine label="volatility" value={isVexx ? '0.2044' : '0.14'} accent={isVexx ? 'pass' : 'fail'} />
                <JsonLine label="sharpe" value={isVexx ? '0.5945' : '1.214'} accent={isVexx ? 'pass' : 'fail'} />
              </div>
              <div className="text-slate-400">{'}'}</div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 border-t border-white/10 pt-2.5">
            {isVexx ? (
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-[9.5px] text-emerald-300">
                  <Check className="h-3 w-3" /> Σ weights = 1.000000
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 px-2 py-1 font-mono text-[9.5px] text-sky-300">
                  <Zap className="h-3 w-3" /> 24 tokens spliced
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-slate-300">
                  <ShieldCheck className="h-3 w-3" /> PASS
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1 font-mono text-[9.5px] text-rose-300">
                  <AlertTriangle className="h-3 w-3" /> Σ weights = 1.250000
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1 font-mono text-[9.5px] text-rose-300">
                  <AlertTriangle className="h-3 w-3" /> sharpe ≠ derived
                </span>
                <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-slate-400">retry loop</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/[0.02]">
        {[
          { k: 'PDA mask', v: isVexx ? '0.23 ms' : 'off' },
          { k: '0-DoF saved', v: isVexx ? '24 tok' : '0 tok' },
          { k: 'Witness', v: isVexx ? 'SHA-256' : 'none' },
        ].map((m) => (
          <div key={m.k} className="px-3 py-2.5">
            <p className="font-mono text-[9px] tracking-[0.1em] text-slate-400">{m.k}</p>
            <p
              className={cn(
                'mt-0.5 font-mono text-[11px] font-medium sm:text-[12px]',
                isVexx ? 'text-slate-100' : 'text-slate-400',
              )}
            >
              {m.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldNote({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className={cn('vx-orb-label', className)}>
      {label}
      <b>{value}</b>
    </span>
  );
}

export function Hero() {
  const [demoMode, setDemoMode] = useState<Mode>('vexx');
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const isVexx = demoMode === 'vexx';

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText('pip install vexx-ai');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the command is still visible */
    }
  };

  return (
    <>
      <section className="relative">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* printed copy */}
          <div className="vx-rise relative z-10 px-5 pb-10 pt-6 sm:px-9 sm:pb-12 sm:pt-8 lg:px-12 lg:pb-14 lg:pt-10">
            <div className="flex items-center justify-between gap-3">
              <span className="vx-mono inline-flex items-center gap-2 text-ink-primary">
                <span className="vx-dot bg-cobalt-600" /> vexx <span className="text-ink-muted">by maya labs.</span>
              </span>
              <span className="vx-mono text-ink-muted">vexx2.1</span>
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-14">
              <span className="vx-chip">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7b6bff]" />
                new in 2.1 · code engine · receipts · MCP firewall
              </span>

              <h1 className="vx-display mt-5 text-ink-primary">
                Make the model{' '}
                <button
                  aria-label="Toggle Vexx solver mode"
                  aria-pressed={isVexx}
                  onClick={() => setDemoMode(isVexx ? 'json' : 'vexx')}
                  className={cn(
                    'vx-piece-switch',
                    isVexx
                      ? 'bg-gradient-to-r from-[#2145ff] to-[#0f2ac2] text-white shadow-[0_6px_16px_-6px_rgba(33,69,255,0.8),inset_0_1px_0_rgba(255,255,255,0.5)]'
                      : 'bg-[#c8cbd3] text-[#555b67] shadow-inner',
                  )}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    className={cn('vx-piece-knob', isVexx && 'ml-auto')}
                  />
                </button>{' '}
                <span className={isVexx ? 'vx-marker' : 'vx-marker vx-marker--lime'}>{isVexx ? 'prove it.' : 'guess.'}</span>
              </h1>

              <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-ink-secondary sm:text-[16.5px]">
                Structured output you can actually trust. Vexx compiles your schema and the algebra
                between its fields into the decoder — then re-verifies every result and ships a proof
                that stands on its own.
              </p>

              <p className="vx-mono mt-3 text-ink-muted">same prompt · same model · no plausible nonsense</p>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Magnetic>
                  <Link href="/docs/getting-started/quickstart" className="vx-btn vx-btn-dark h-11 px-5">
                    Start in 60 seconds
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link href="/playground" className="vx-btn vx-btn-light h-11 px-5">
                  <Play className="h-3.5 w-3.5 fill-cobalt-500 text-cobalt-500" />
                  Open the playground
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyInstall}
                  aria-label="Copy install command"
                  className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-canvas px-3.5 py-2 font-mono text-[11px] text-ink-secondary transition-colors hover:border-border-cobalt hover:text-ink-primary"
                >
                  <span className="text-ink-primary">pip install vexx-ai</span>
                  {copied ? <Check className="h-3.5 w-3.5 text-verify-pass" /> : <Copy className="h-3.5 w-3.5 text-ink-muted" />}
                </button>
                <Link href="/docs" className="link-draw font-mono text-[11px] text-ink-secondary hover:text-ink-primary">
                  Read the docs
                </Link>
              </div>

              <a
                href="#in-the-wild"
                className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-border-cobalt bg-cobalt-50/60 px-3 py-1.5 font-mono text-[10px] text-cobalt-700 transition-colors hover:bg-cobalt-100 dark:bg-cobalt-500/10 dark:text-cobalt-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-coral" />
                also running inside maya250M + MayaWorkbench
              </a>
            </div>
          </div>

          {/* cropped stipple interlock */}
          <div className="vx-orb-panel relative min-h-[320px] border-t border-white/10 sm:min-h-[380px] lg:min-h-[600px] lg:border-l lg:border-t-0">
            <div aria-hidden className="vx-orb" />
            <StippleField />

            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-5 sm:min-h-[380px] sm:p-7 lg:min-h-[600px]">
              <div className="flex items-start justify-between gap-3">
                <span className="vx-mono text-white/75">solver-guided decoding</span>
                <span className="vx-mono text-white/55">vexx2.1</span>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                <FieldNote className="left-[7%] top-[30%]" label="mask" value="0.23 ms" />
                <FieldNote className="left-[36%] top-[17%]" label="spliced" value="0 LLM calls" />
                <FieldNote className="right-[7%] top-[35%]" label="witness" value="SHA-256" />
                <FieldNote className="right-[6%] top-[63%]" label="receipt" value="per-field KL" />
              </div>

              <div className="relative mt-auto flex flex-1 items-end pb-2">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[34ch]"
                >
                  <p className="font-display text-[1.6rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem]">
                    Every piece has to fit.
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/70">
                    A stippled tile for every token: sampled, masked, or deterministically spliced.
                    Only the pieces that agree are allowed to lock.
                  </p>
                </motion.div>
              </div>

              <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/20 pt-3 font-mono text-[9.5px] text-white/75">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#bdb9ff]" /> sampled</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/35" /> masked</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d2f45b]" /> spliced</span>
                <Link
                  href="/docs/getting-started/how-vexx-works"
                  className="ml-auto inline-flex items-center gap-1 text-white/85 hover:text-white"
                >
                  how it works <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the whole pitch in one screen */}
      <section className="vx-band relative bg-bg-canvas px-5 pb-10 pt-9 sm:px-9 sm:pb-12 sm:pt-11 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="vx-mono text-ink-muted">the whole pitch in one screen</span>
            <h2 className="display-lg mt-2 text-ink-primary">
              Two answers. Only one <span className="vx-marker">survives review.</span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-relaxed text-ink-secondary sm:text-right">
            Flip the decoder above. One universe produces plausible nonsense; the other produces
            arithmetic that holds and a witness that proves it.
          </p>
        </div>

        <div className="mt-6">
          <HeroDemo mode={demoMode} setMode={setDemoMode} />
        </div>

        <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-border-subtle bg-bg-elevated sm:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'px-4 py-4 sm:px-5 sm:py-4',
                i % 2 === 1 && 'border-l border-border-subtle',
                i > 1 && 'border-t border-border-subtle sm:border-t-0',
                i > 0 && 'sm:border-l sm:border-border-subtle',
              )}
            >
              <p className="font-display text-[1.4rem] font-extrabold tracking-tight text-ink-primary sm:text-[1.65rem]">
                {stat.value}
                <span className="ml-0.5 text-[0.8rem] font-semibold text-cobalt-600 dark:text-cobalt-300">
                  {stat.unit}
                </span>
              </p>
              <p className="vx-mono mt-1 text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="vx-mono mt-2.5 text-ink-muted">
          measured by the repo benchmark suite · GitHub Actions runner · 605-token vocabulary
        </p>
      </section>
    </>
  );
}
