import { ArrowRight, type LucideIcon } from 'lucide-react';

type NextReadProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta?: string;
  icon?: LucideIcon;
};

export default function NextRead({
  eyebrow = 'Next read',
  title,
  description,
  href,
  cta = 'Continue',
  icon: Icon,
}: NextReadProps) {
  return (
    <section className="border-y border-amber-950/60 py-7 md:py-9" aria-labelledby="next-read-title">
      <a href={href} className="group grid grid-cols-1 gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="flex h-12 w-12 items-center justify-center border border-orange-500/40 bg-orange-500/[0.06] text-orange-400">
          {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase text-orange-400">{eyebrow}</p>
          <h2 id="next-read-title" className="mt-2 text-2xl font-extrabold leading-tight text-slate-100 group-hover:text-orange-300">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
        <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-orange-400 group-hover:text-orange-300">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
