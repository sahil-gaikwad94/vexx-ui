'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CAPABILITIES = [
  {
    tag: '2.1 · code engine',
    title: 'Generate code that has to check out',
    body: 'An incremental lexer with PEP 701 f-strings, live callable contracts, vocab and logit masking, a bounded symbolic CAS and an isolated subprocess sandbox. Research verification, not vibes.',
    href: '/docs/code-engine/overview',
    tone: 'lilac',
  },
  {
    tag: '2.1 · receipts',
    title: 'Know exactly what the mask cost',
    body: 'Per-field KL divergence (−log of accepted probability mass), content hashes and budget counters travel with every result. No quietly lobotomised distributions.',
    href: '/docs/proofs-rl-and-cli/proof-certificates',
    tone: 'lime',
  },
  {
    tag: '2.1 · MCP firewall',
    title: 'Tool calls with a constitution',
    body: 'Finite-trace LTLf policies, symbolic bindings to earlier tool outputs, spend caps and taint tracking. An agent cannot refund more than the order it just looked up.',
    href: '/docs/cartridges/security-and-iam-policies',
    tone: 'lilac',
  },
  {
    tag: '2.1 · explain-unsat',
    title: 'An impossible spec, with the smallest fix',
    body: 'Get the least widening or raising that makes the system satisfiable — or a straight answer that the conflict is structural and no single clause will save it.',
    href: '/docs/proofs-rl-and-cli/cli-reference',
    tone: 'white',
  },
  {
    tag: '2.1 · export-rl',
    title: 'Every dead end becomes training data',
    body: 'Decoder traces turn into DPO or GRPO JSONL with SHA-256 manifests. Rejected UNSAT branches against verified completions, straight into local fine-tuning.',
    href: '/docs/proofs-rl-and-cli/rl-trajectory-collector',
    tone: 'white',
  },
  {
    tag: '2.1 · serve',
    title: 'A bouncer in front of your model',
    body: 'An OpenAI-compatible proxy re-verifies non-streaming completions, returns 422 on a violation and attaches a certificate event before a stream closes.',
    href: '/docs/bridges-and-integrations/async-stream-proxy',
    tone: 'lime',
  },
] as const;

export function Superpowers() {
  return (
    <section id="superpowers" className="vx-dot-field section-y overflow-hidden">
      <div aria-hidden className="vx-pixel-wave -left-24 h-[300px] w-[52%] text-[#bdb9ff] sm:h-[420px]" />
      <div aria-hidden className="vx-pixel-wave -right-24 h-[260px] w-[46%] text-[#8fb7ff] sm:h-[380px]" />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="vx-mono text-[#bdb9ff]">what 2.1 adds</span>
          <h2 className="display-lg mt-3 text-white">
            A proof for the answer. <span className="vx-marker">A proof for the code.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[58ch] text-[15px] leading-relaxed text-white/65">
            Vexx 2.1 ports the neuro-symbolic code engine into the standalone library and hardens the
            layer around it: receipts, an agent firewall, better CLI tooling and a verifying proxy.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl border-t border-white/15">
          {CAPABILITIES.map((item) => (
            <Link
              key={item.tag}
              href={item.href}
              className="group grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[170px_1fr_auto] sm:items-start sm:gap-8 sm:py-6"
            >
              <span className="vx-mono inline-flex items-center gap-2 text-white/50">
                <span
                  className={cn(
                    'h-2 w-2 shrink-0 rotate-12 rounded-[3px]',
                    item.tone === 'lilac' && 'bg-[#bdb9ff]',
                    item.tone === 'lime' && 'bg-[#d2f45b]',
                    item.tone === 'white' && 'bg-white/60',
                  )}
                />
                {item.tag}
              </span>
              <span>
                <span className="block font-display text-[1.15rem] font-bold tracking-[-0.025em] text-white sm:text-[1.3rem]">
                  {item.title}
                </span>
                <span className="mt-1.5 block max-w-[66ch] text-[13px] leading-relaxed text-white/60">
                  {item.body}
                </span>
              </span>
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all group-hover:translate-x-0.5 group-hover:border-white/50 group-hover:text-white sm:mt-0">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="vx-mono mt-6 text-center text-white/45">
          package and Rust workspace both aligned at 2.1.0 · Apache-2.0
        </p>
      </div>
    </section>
  );
}
