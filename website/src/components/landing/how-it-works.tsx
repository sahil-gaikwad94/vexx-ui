import Link from 'next/link';
import { ArrowUpRight, Check, CircleDot, Fingerprint, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    n: '01',
    title: 'Author',
    body: 'A Pydantic model plus require, derive, prefer and forall. No new syntax to learn.',
  },
  {
    n: '02',
    title: 'Compile',
    body: 'Constraints become VIR. Preflight proves the spec is satisfiable before any tokens are spent.',
  },
  {
    n: '03',
    title: 'Decode',
    body: 'A JSON PDA masks illegal tokens, contractors narrow numeric domains, derived fields are spliced.',
  },
  {
    n: '04',
    title: 'Verify & prove',
    body: 'Every constraint is re-evaluated on the concrete object, then bundled into a portable certificate.',
  },
] as const;

const FOOTER = [
  {
    icon: Layers,
    title: 'A world of possibilities',
    body: 'Nine domain cartridges, from portfolios to SMILES, all on the same engine.',
    href: '/docs/cartridges/overview',
    action: 'Browse cartridges',
  },
  {
    icon: CircleDot,
    title: 'Soundness you can trust',
    body: 'Outward-rounded intervals, exact refutations and a public record of fixes.',
    href: '/benchmarks',
    action: 'See the evidence',
  },
  {
    icon: Fingerprint,
    title: 'Receipts for every result',
    body: 'KL receipts, SHA-256 witnesses and offline verification with no backend.',
    href: '/verify',
    action: 'Verify a proof',
  },
] as const;

export function HowItWorks() {
  return (
    <section id="contractor" className="section-y bg-bg-canvas px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="vx-frame-card grid lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          {/* editorial column */}
          <div className="p-6 sm:p-9 lg:p-12">
            <span className="vx-mono inline-flex items-center gap-2 text-cobalt-600 dark:text-cobalt-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cobalt-600 dark:bg-cobalt-300" />
              how vexx works
            </span>

            <h2 className="vx-display-sm mt-5 text-[2rem] text-ink-primary sm:text-[2.6rem] lg:text-[3rem]">
              A schema that can&apos;t lie, assembled in{' '}
              <span className="vx-marker">four passes.</span>
            </h2>
            <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-secondary sm:text-[15.5px]">
              The model still proposes. Vexx decides which proposals are allowed to exist — from the
              first brace to the final proof.
            </p>

            <ol className="mt-8 border-t border-border-subtle">
              {STEPS.map((step) => (
                <li key={step.n} className="grid grid-cols-[2.2rem_1fr] gap-3 border-b border-border-subtle py-3.5 sm:grid-cols-[2.8rem_1fr] sm:gap-4 sm:py-4">
                  <span className="vx-mono pt-0.5 text-cobalt-600 dark:text-cobalt-300">{step.n}</span>
                  <span>
                    <span className="block font-display text-[15px] font-bold tracking-[-0.02em] text-ink-primary">
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-secondary">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <Link
              href="/docs/getting-started/how-vexx-works"
              className="vx-btn vx-btn-dark mt-7 h-10 px-4 text-[12.5px]"
            >
              Walk through the pipeline
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* stippled interlock diagram */}
          <div className="relative min-h-[300px] overflow-hidden border-t border-border-subtle bg-cobalt-800 sm:min-h-[380px] lg:border-l lg:border-t-0">
            <div
              aria-hidden
              className="absolute inset-0 bg-[url('/art/interlock-hero.svg')] bg-cover bg-center opacity-95"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#1230b4]/25 via-transparent to-[#081461]/85" />

            <div className="relative flex h-full min-h-[300px] flex-col justify-between p-5 sm:min-h-[380px] sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="vx-mono text-white/70">one decode, four gates</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 font-mono text-[9.5px] text-white/85 backdrop-blur">
                  <Check className="h-3 w-3 text-[#d2f45b]" /> PASS
                </span>
              </div>

              <div className="mt-auto flex flex-wrap items-end gap-2">
                {[
                  { k: 'mask', v: '0.23 ms' },
                  { k: 'contract', v: '3.9 µs' },
                  { k: 'splice', v: '0 calls' },
                  { k: 'proof', v: 'SHA-256' },
                ].map((cell) => (
                  <div key={cell.k} className="min-w-[86px] flex-1 rounded-xl border border-white/20 bg-white/[0.08] px-3 py-2.5 backdrop-blur-md">
                    <p className="font-mono text-[9px] text-white/60">{cell.k}</p>
                    <p className="mt-0.5 font-display text-[15px] font-bold tracking-tight text-white">{cell.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* three hairline cells, like the reference card footer */}
          <div className="col-span-full grid border-t border-border-subtle sm:grid-cols-3">
            {FOOTER.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'group flex gap-3 p-5 transition-colors hover:bg-bg-subtle sm:p-6',
                    i > 0 && 'border-t border-border-subtle sm:border-l sm:border-t-0',
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-bg-subtle text-cobalt-600 transition-transform group-hover:-rotate-6 dark:text-cobalt-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-[13px] font-bold tracking-[-0.015em] text-ink-primary">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[11.5px] leading-relaxed text-ink-secondary">{item.body}</span>
                    <span className="vx-mono mt-2 inline-flex items-center gap-1 text-cobalt-600 dark:text-cobalt-300">
                      {item.action} <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
