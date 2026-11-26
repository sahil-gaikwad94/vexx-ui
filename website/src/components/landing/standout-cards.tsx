import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const CLAIMS = [
  {
    label: 'vexx2.1',
    sub: 'the release',
    body: 'The standalone 2.1 release: a neuro-symbolic code engine, KL receipts, an agent firewall, explain-unsat, export-rl and a verifying proxy.',
    href: '/docs/release-notes',
  },
  {
    label: '0.23 ms',
    sub: 'native mask',
    body: 'One JSON mask step across a 605-token vocabulary — 17.9× faster than the Python reference path.',
    href: '/benchmarks',
  },
  {
    label: '422',
    sub: 'vexx serve',
    body: 'An OpenAI-compatible proxy that refuses schema violations before your application ever sees them.',
    href: '/docs/proofs-rl-and-cli/cli-reference',
  },
  {
    label: 'LTLf',
    sub: 'MCP firewall',
    body: 'Tool ordering, symbolic bindings, spend caps and taint tracking for agents one hallucination away from expensive.',
    href: '/docs/cartridges/security-and-iam-policies',
  },
  {
    label: '−log P',
    sub: 'KL receipts',
    body: 'Exactly how much probability your mask removed, per field and per step. Served with the result.',
    href: '/docs/proofs-rl-and-cli/proof-certificates',
  },
  {
    label: '425 + 69',
    sub: 'tests',
    body: 'Python tests plus Rust unit tests, including the ones written after the audit found real unsoundness.',
    href: '/benchmarks',
  },
] as const;

export function StandoutCards() {
  return (
    <section id="standout" className="section-y bg-bg-canvas px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="max-w-2xl">
          <span className="vx-mono text-ink-muted">the receipts</span>
          <h2 className="display-lg mt-3 text-ink-primary">
            Six claims, all <span className="vx-marker vx-marker--lime">checkable.</span>
          </h2>
          <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-ink-secondary">
            Every number here lives in the repo, the release notes or the benchmark suite. Click
            through and audit us.
          </p>
        </div>

        <div className="mt-10 border-t border-border-subtle">
          {CLAIMS.map((claim) => (
            <Link
              key={claim.label}
              href={claim.href}
              className="group grid gap-2 border-b border-border-subtle py-5 sm:grid-cols-[190px_1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <p className="font-display text-[1.7rem] font-extrabold leading-none tracking-[-0.04em] text-ink-primary sm:text-[2.1rem]">
                  {claim.label}
                </p>
                <p className="vx-mono mt-1.5 text-ink-muted">{claim.sub}</p>
              </div>
              <p className="max-w-[62ch] text-[13px] leading-relaxed text-ink-secondary sm:text-[13.5px]">
                {claim.body}
              </p>
              <span className="inline-flex items-center gap-1 self-start rounded-full border border-border-subtle px-3 py-1.5 font-mono text-[10px] text-ink-secondary transition-colors group-hover:border-border-cobalt group-hover:text-ink-primary">
                inspect <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
