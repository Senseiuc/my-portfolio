import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import MobileMapNav from './MobileMapNav';

const PRIMARY_NAV_GROUPS = [
  {
    label: 'About',
    href: '/#about',
    summary: 'Start with the person, path, and credibility.',
    links: [
      ['/#about', 'Overview'],
      ['/#experience', 'Experience'],
      ['/before-systems', 'Origin story'],
      ['/leadership', 'Leadership'],
      ['/credentials', 'Academics & Credentials'],
      ['/life', 'Life outside code'],
      ['/resume.html', 'Resume'],
    ],
  },
  {
    label: 'Projects',
    href: '/#projects',
    summary: 'See real work, live links, and what each project solved.',
    links: [
      ['/#projects', 'Featured cases'],
      ['/work', 'All projects'],
      ['/work/konga-merchant-platform', 'Konga case study'],
    ],
  },
  {
    label: 'Systems',
    href: '/#competencies',
    summary: 'See the skills behind the work in plain terms.',
    links: [
      ['/#competencies', 'Capabilities'],
      ['/systems', 'How the systems work'],
      ['/console', 'Portfolio console'],
    ],
  },
  {
    label: 'Contact',
    href: '/#contact',
    summary: 'Reach out or verify public profiles.',
    links: [
      ['/#contact', 'Contact form'],
      ['mailto:hello@gideonnwadialu.com', 'Email'],
      ['https://github.com/Senseiuc', 'GitHub'],
      ['https://www.linkedin.com/in/gideonnwadialu/', 'LinkedIn'],
      ['https://www.instagram.com/senseiuc/', 'Instagram'],
      ['https://x.com/SenseiUC', 'X / Twitter'],
    ],
  },
] as const;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-950/40 bg-[#0a0806]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="/" className="flex min-h-11 min-w-0 items-center gap-1.5" aria-label="Gideon Nwadialu home">
          <Logo className="h-8 w-8" />
          <span className="hidden font-mono text-[10px] font-bold uppercase text-slate-100 min-[360px]:inline sm:text-sm">
            GIDEON <span className="text-orange-400">NWADIALU</span>
          </span>
          <span className="font-mono text-[10px] font-bold uppercase text-slate-100 min-[360px]:hidden">
            GIDEON <span className="text-orange-400">N.</span>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-2 font-mono text-xs text-slate-400 md:flex">
          {PRIMARY_NAV_GROUPS.map((group) => (
            <div key={group.label} className="group/nav relative">
              <a
                href={group.href}
                className="inline-flex min-h-11 items-center gap-1.5 px-2 uppercase transition-colors hover:text-orange-400 focus-visible:text-orange-400"
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover/nav:rotate-180" aria-hidden="true" />
              </a>
              <div className="invisible absolute right-0 top-full z-50 w-72 border border-slate-800 bg-[#0d0a07] p-3 opacity-0 shadow-2xl transition-all duration-150 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                <p className="text-[10px] font-bold uppercase text-orange-400">{group.label}</p>
                <p className="mt-1 font-sans text-xs normal-case leading-relaxed text-slate-500">{group.summary}</p>
                <div className="mt-3 space-y-1">
                  {group.links.map(([href, label]) => (
                    <a
                      key={`${group.label}-${href}`}
                      href={href}
                      className="flex items-center justify-between gap-3 border border-transparent px-2 py-2 text-slate-300 transition-colors hover:border-orange-500/40 hover:bg-orange-500/[0.05] hover:text-orange-400"
                    >
                      <span>{label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-700" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <MobileMapNav className="md:hidden" />
      </div>
    </header>
  );
}
