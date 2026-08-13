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

const navGroups = [
  {
    label: 'About',
    detail: 'Who Gideon is and how he works',
    icon: User,
    links: [
      { href: '/', label: 'Overview', detail: 'Start here', icon: Home },
      { href: '/#experience', label: 'Experience', detail: 'Career context', icon: Briefcase },
      { href: '/before-systems', label: 'Origin story', detail: 'Teaching, support, operations', icon: User },
      { href: '/leadership', label: 'Leadership', detail: 'Mentorship and service roles', icon: HeartHandshake },
      { href: '/credentials', label: 'Credentials', detail: 'Certificates and learning stack', icon: Award },
      { href: '/life', label: 'Life outside code', detail: 'Curiosity, rhythm, people', icon: Compass },
      { href: '/resume.html', label: 'Resume', detail: 'Printable career snapshot', icon: FileText },
    ],
  },
  {
    label: 'Projects',
    detail: 'Real work and client-ready examples',
    icon: Briefcase,
    links: [
      { href: '/#projects', label: 'Featured projects', detail: 'Quick project highlights', icon: Compass },
      { href: '/work', label: 'All projects', detail: 'Complete work archive', icon: Briefcase },
      { href: '/work/konga-merchant-platform', label: 'Konga case study', detail: 'A deeper project story', icon: Map },
    ],
  },
  {
    label: 'Systems',
    detail: 'Skills and how the work is built',
    icon: Route,
    links: [
      { href: '/#competencies', label: 'Skills', detail: 'Web, backend, mobile, launch', icon: Cpu },
      { href: '/systems', label: 'How systems work', detail: 'Project flows and safeguards', icon: Route },
      { href: '/console', label: 'Portfolio console', detail: 'Live site details', icon: Terminal },
    ],
  },
  {
    label: 'Contact',
    detail: 'Start a conversation or verify public profiles',
    icon: Mail,
    links: [
      { href: '/#contact', label: 'Contact form', detail: 'Send a direct message', icon: Mail },
      { href: 'mailto:hello@gideonnwadialu.com', label: 'Email', detail: 'hello@gideonnwadialu.com', icon: Mail },
      { href: 'https://github.com/Senseiuc', label: 'GitHub', detail: 'Public code and activity', icon: Terminal },
      { href: 'https://www.linkedin.com/in/gideonnwadialu/', label: 'LinkedIn', detail: 'Professional profile', icon: User },
    ],
  },
];
const mapLinks = navGroups.flatMap((group) => group.links);

type MobileMapNavProps = {
  className?: string;
};

export default function MobileMapNav({ className = '' }: MobileMapNavProps) {
  const [open, setOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(() => `${window.location.pathname}${window.location.hash}`);

  useEffect(() => {
    const syncLocation = () => setCurrentLocation(`${window.location.pathname}${window.location.hash}`);

    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

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

  const normalizePath = (href: string) => {
    if (href.startsWith('/')) return href;
    return `/${href}`;
  };

  const isActiveLink = (href: string) => {
    if (!href.startsWith('/')) return false;

    const [currentPath, currentHashValue] = currentLocation.split('#');
    const currentHash = currentHashValue ? `#${currentHashValue}` : '';

    if (href.includes('#')) {
      const [hrefPath, hrefHash] = href.split('#');
      const normalizedHrefPath = hrefPath || '/';
      return currentPath === normalizedHrefPath && currentHash === `#${hrefHash}`;
    }

    return currentPath === normalizePath(href) && !currentHash;
  };

  const activeLabel = mapLinks.find((link) => isActiveLink(link.href))?.label ?? 'Current stop';

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
            Four clear paths: about, projects, systems, and contact.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/[0.08] px-2 py-1 font-mono text-[10px] uppercase text-orange-300">
            <span className="h-1.5 w-1.5 bg-orange-400" aria-hidden="true" />
            You are here: {activeLabel}
          </p>
        </div>

        <nav aria-label="Mobile site map" className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-5">
            {navGroups.map((group, groupIndex) => {
              const GroupIcon = group.icon;
              const groupActive = group.links.some((link) => isActiveLink(link.href));
              return (
                <div key={group.label} className={`border p-3 ${groupActive ? 'border-orange-500/70 bg-orange-500/[0.05]' : 'border-slate-800 bg-black/15'}`}>
                  <div className="grid grid-cols-[2.4rem_1fr] gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center border bg-[#0d0a07] text-orange-400 ${groupActive ? 'border-orange-400' : 'border-amber-900/70'}`}>
                      <GroupIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-sm font-bold text-slate-100">
                        <span className="font-mono text-[10px] text-slate-600">{String(groupIndex + 1).padStart(2, '0')}</span>
                        {group.label}
                        {groupActive && <span className="font-mono text-[9px] uppercase text-orange-400">Here</span>}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{group.detail}</p>
                    </div>
                  </div>

                  <div className="relative mt-3 space-y-2 pl-5 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:border-l before:border-dashed before:border-amber-900/70">
                    {group.links.map((link) => {
                      const Icon = link.icon;
                      const isActive = isActiveLink(link.href);
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`group/link relative grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 border px-2 py-2 transition-colors hover:border-orange-500/60 hover:bg-orange-500/[0.04] ${
                            isActive
                              ? 'border-orange-500/70 bg-orange-500/[0.08]'
                              : 'border-slate-800 bg-black/25'
                          }`}
                        >
                          <span className={`relative z-10 flex h-6 w-6 items-center justify-center border bg-[#0d0a07] text-orange-400 ${
                            isActive ? 'border-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.32)]' : 'border-amber-900/70'
                          }`}>
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 text-xs font-bold text-slate-100 group-hover/link:text-orange-400">
                              {link.label}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-relaxed text-slate-500">{link.detail}</span>
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-700 transition-colors group-hover/link:text-orange-400" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
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
