import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Award,
  Briefcase,
  ChevronRight,
  Compass,
  Cpu,
  FileText,
  HeartHandshake,
  Home,
  Mail,
  Map,
  Menu,
  Route,
  Terminal,
  User,
  X,
} from 'lucide-react';
import Logo from './Logo';

const mapLinks = [
  { href: '/', label: 'Home base', detail: 'Intro, flagship work, contact', icon: Home },
  { href: '/#projects', label: 'Flagship cases', detail: 'Pressure-tested project cockpit', icon: Compass },
  { href: '/#competencies', label: 'Capabilities', detail: 'Frontend, backend, mobile, DevOps', icon: Cpu },
  { href: '/work', label: 'Project archive', detail: 'All shipped systems', icon: Briefcase },
  { href: '/systems', label: 'Architecture room', detail: 'Interactive system flows', icon: Route },
  { href: '/work/konga-merchant-platform', label: 'Konga case study', detail: 'Commerce engineering deep dive', icon: Map },
  { href: '/leadership', label: 'Leadership', detail: 'Mentorship and service roles', icon: HeartHandshake },
  { href: '/credentials', label: 'Credentials', detail: 'Certificates and learning stack', icon: Award },
  { href: '/before-systems', label: 'Origin story', detail: 'Teaching, support, operations', icon: User },
  { href: '/life', label: 'Life outside code', detail: 'Curiosity, rhythm, people', icon: Compass },
  { href: '/console', label: 'Portfolio console', detail: 'Runtime, GitHub, explorer', icon: Terminal },
  { href: '/resume.html', label: 'Resume', detail: 'Printable career snapshot', icon: FileText },
  { href: '/#contact', label: 'Contact', detail: 'Start a conversation', icon: Mail },
];

type MobileMapNavProps = {
  className?: string;
};

export default function MobileMapNav({ className = '' }: MobileMapNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const overlay = open ? createPortal(
    <div
      className="fixed inset-0 z-[100] bg-[#0a0806]/96 backdrop-blur-md md:hidden"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        id="mobile-map-nav"
        className="ml-auto flex h-dvh max-w-[390px] flex-col border-l border-amber-950/60 bg-[#0d0a07] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-amber-950/60 px-4 py-3">
          <a href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-mono text-xs font-bold uppercase text-slate-100">
              Senseiuc <span className="text-orange-400">map</span>
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center border border-slate-800 text-slate-300 transition-colors hover:border-orange-500/60 hover:text-orange-400"
            aria-label="Close site map"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-amber-950/60 px-4 py-4">
          <p className="font-mono text-[10px] uppercase text-orange-400">Choose your route</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            A quick map through the work, systems, story, credentials, console, and contact points.
          </p>
        </div>

        <nav aria-label="Mobile site map" className="flex-1 overflow-y-auto px-4 py-4">
          <div className="relative space-y-2 before:absolute before:left-[1.32rem] before:top-5 before:h-[calc(100%-2.5rem)] before:border-l before:border-dashed before:border-amber-900/70">
            {mapLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group relative grid grid-cols-[2.7rem_1fr_auto] items-center gap-3 border border-slate-800 bg-black/25 px-3 py-3 transition-colors hover:border-orange-500/60 hover:bg-orange-500/[0.04]"
                >
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center border border-amber-900/70 bg-[#0d0a07] text-orange-400">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-100 group-hover:text-orange-400">
                      <span className="font-mono text-[10px] text-slate-600">{String(index + 1).padStart(2, '0')}</span>
                      {link.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-500">{link.detail}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-700 transition-colors group-hover:text-orange-400" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-amber-950/60 px-4 py-4">
          <a
            href="mailto:hello@gideonnwadialu.com"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-orange-500 px-4 py-3 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400"
          >
            <Mail className="h-4 w-4" />
            hello@gideonnwadialu.com
          </a>
        </div>
      </div>
    </div>,
    document.body,
  ) : null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-800 bg-slate-950/50 text-slate-200 transition-colors hover:border-orange-500/60 hover:text-orange-400 md:hidden"
        aria-label="Open site map"
        aria-expanded={open}
        aria-controls="mobile-map-nav"
      >
        <Menu className="h-5 w-5" />
      </button>
      {overlay}
    </div>
  );
}
