'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpRight, Check, Cpu, FlaskConical } from 'lucide-react';
import { ecosystem } from '@/lib/site';
import { cn } from '@/lib/utils';

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty('--ry', `${x * 5}deg`);
    node.style.setProperty('--rx', `${-y * 5}deg`);
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--ry', '0deg');
    node.style.setProperty('--rx', '0deg');
  };

  return { ref, onMove, onLeave };
}

function Tile({ item, index }: { item: (typeof ecosystem)[number]; index: number }) {
  const tilt = useTilt();
  const Icon = index === 0 ? Cpu : FlaskConical;

  return (
    <div
      ref={tilt.ref}
      onPointerMove={tilt.onMove}
      onPointerLeave={tilt.onLeave}
      className="group relative [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-300 ease-out"
    >
      <div className="vx-frame-card relative h-full overflow-hidden p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 dot-bg opacity-40" />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100',
            item.accent === 'lilac' ? 'bg-accent-coral/25 opacity-60' : 'bg-accent-acid/25 opacity-50',
          )}
        />

        <div className="relative flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <span
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-[14px] border text-white shadow-[var(--vt-shadow-cobalt)]',
                item.accent === 'lilac'
                  ? 'border-[#bdb9ff]/50 bg-gradient-to-br from-[#7b6bff] to-[#2145ff]'
                  : 'border-[#d2f45b]/50 bg-gradient-to-br from-[#2145ff] to-[#0f2ac2]',
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-[17px] font-extrabold tracking-[-0.03em] text-ink-primary">
                {item.label}
              </span>
              <span className="vx-mono block text-ink-muted">{item.kind}</span>
            </span>
          </span>
          <span className="vx-mono text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="relative mt-6 max-w-[26ch] font-display text-[1.45rem] font-bold leading-[1.12] tracking-[-0.035em] text-ink-primary sm:text-[1.7rem]">
          {item.title}
        </h3>
        <p className="relative mt-3 text-[13px] leading-relaxed text-ink-secondary sm:text-[13.5px]">
          {item.body}
        </p>

        <ul className="relative mt-6 space-y-2 border-t border-border-subtle pt-4">
          {item.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-[12.5px] text-ink-secondary">
              <Check className="h-3.5 w-3.5 shrink-0 text-verify-pass" />
              {point}
            </li>
          ))}
        </ul>

        <Link
          href={item.href}
          className="relative mt-6 inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-[12.5px] font-semibold text-ink-primary transition-colors hover:border-border-cobalt"
        >
          {item.action}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function InTheWild() {
  return (
    <section id="in-the-wild" className="section-y relative overflow-hidden bg-bg-canvas px-4 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <div className="max-w-2xl">
          <span className="vx-mono inline-flex items-center gap-2 text-cobalt-600 dark:text-cobalt-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bdb9ff]" />
            in the wild · maya labs.
          </span>
          <h2 className="display-lg mt-3 text-ink-primary">
            The same proof, inside a model <span className="vx-marker">and inside a workbench.</span>
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-ink-secondary">
            Vexx 2.1 is not just a pip install. It runs inside maya labs.' own coding model and
            research workbench — the same engine, three very different surfaces.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {ecosystem.map((item, index) => (
            <Tile key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-5 font-mono text-[10.5px] text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-[3px] bg-cobalt-600" /> vexx2.1 engine
          </span>
          <span className="h-px w-8 bg-border-strong" />
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-[3px] bg-accent-coral" /> maya250M
          </span>
          <span className="h-px w-8 bg-border-strong" />
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-[3px] bg-accent-acid" /> MayaWorkbench
          </span>
          <span className="ml-auto">one spec · every surface</span>
        </div>
      </div>
    </section>
  );
}
