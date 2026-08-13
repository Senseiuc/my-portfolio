import { useState } from 'react';
import { ArrowRight, GraduationCap, HeartHandshake, Users } from 'lucide-react';
import Mascot from './components/Mascot';
import NextRead from './components/NextRead';
import SiteHeader from './components/SiteHeader';

const LEADERSHIP_ROLES = [
  {
    period: 'September 2021 - May 2023',
    role: 'Vice President',
    organization: 'National Association of Mathematical Science Students, University of Lagos',
    category: 'Education',
    impact: [
      'Organized tutorials by coordinating and motivating tutors to help students with challenging lower-level courses.',
      'Mentored students and supported them in overcoming academic hurdles within the department.',
      'Led by example by teaching in both departmental and faculty-wide tutorial sessions.',
    ],
  },
  {
    period: 'January - December 2017',
    role: 'President',
    organization: 'Young Disciples International',
    category: 'Social Services',
    impact: [
      'Provided direction to the executive team and coordinated the organization’s activities.',
      'Organized a talent hunt attended by more than 300 people and featuring over 20 contestants.',
      'Improved outreach and meeting content, contributing to a 50% increase in weekly attendance.',
      'Appointed capable team leads, enabling full-team participation and presentations at the national annual camp.',
    ],
  },
  {
    period: 'October 2023 - October 2024',
    role: 'Lead Tutor',
    organization: 'Engineering Career Expo',
    category: 'Education',
    impact: ['Led tutoring work in an education-focused career programme.'],
  },
  {
    period: 'July - September 2023',
    role: 'Portfolio Reviewer',
    organization: 'ALX Africa',
    category: 'Education',
    impact: ['Reviewed students’ portfolio projects and provided an additional quality checkpoint for their work.'],
  },
  {
    period: 'July 2023 - Present',
    role: 'Internet of Things Intern',
    organization: 'Nithub',
    category: 'Science & Technology',
    impact: ['Participates in an Internet of Things learning and technology programme.'],
  },
  {
    period: 'January 2014 - December 2015',
    role: 'Group Coordinator',
    organization: 'Young Disciples International',
    category: 'Social Services',
    impact: [
      'Led and guided the Ready Writers group.',
      'Helped organize Singles’ Time Out, Variety Week, weekly meetings, and the inaugural Ready Writers event.',
    ],
  },
  {
    period: 'June 2022',
    role: 'Volunteer Staff',
    organization: 'DesignIT Africa',
    category: 'Science & Technology',
    impact: [
      'Supported outreach to schools and helped obtain the materials required for programme delivery.',
      'Introduced students to technology, its importance, and practical ways to navigate the field.',
    ],
  },
];

export default function LeadershipPage() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = LEADERSHIP_ROLES[activeRoleIndex];

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#leadership-timeline" className="skip-link">Skip to leadership timeline</a>
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader />

      <main id="leadership-timeline" tabIndex={-1} className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-16">
        <section className="relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-end border-b border-amber-950/60 pb-8 md:pb-14">
          <div className="md:col-span-9">
            <p className="font-mono text-xs uppercase text-orange-400">Leadership / mentorship / service</p>
            <h1 className="mt-3 pr-16 text-3xl sm:pr-0 sm:text-5xl md:text-6xl font-extrabold leading-tight">Leadership is making<br /><span className="text-orange-400">other people stronger.</span></h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">From mathematics tutorials to community events and technology outreach, these roles taught me to organize clearly, listen closely, delegate thoughtfully, and contribute alongside the people I lead.</p>
          </div>
          <div className="absolute right-0 top-0 md:static md:col-span-3 md:flex md:justify-end">
            <Mascot variant="partner" label="Leadership and collaboration mascot" motion="float" className="w-16 sm:w-24 md:w-40" />
          </div>
        </section>

        <section className="py-8 md:py-14 grid grid-cols-3 gap-3 md:gap-5 border-b border-slate-800">
          {[
            [Users, '300+', 'Talent-event audience'],
            [HeartHandshake, '50%', 'Weekly attendance growth'],
            [GraduationCap, '7', 'Leadership and service roles'],
          ].map(([Icon, value, label]) => {
            const MetricIcon = Icon as typeof Users;
            return (
              <div key={String(label)} className="border-l border-orange-500 pl-4">
                <MetricIcon className="w-4 h-4 text-orange-400 md:w-5 md:h-5" />
                <p className="mt-2 text-xl font-extrabold md:mt-3 md:text-3xl">{String(value)}</p>
                <p className="mt-1 text-xs font-mono text-slate-500">{String(label)}</p>
              </div>
            );
          })}
        </section>

        <section className="py-10 md:py-14">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-xs uppercase text-orange-400">Role switchboard</p>
              <div className="mt-4 flex gap-2 overflow-x-auto border-y border-slate-800 py-2 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:p-2">
                {LEADERSHIP_ROLES.map((entry, index) => {
                  const isActive = index === activeRoleIndex;
                  return (
                    <button
                      key={`${entry.role}-${entry.organization}`}
                      type="button"
                      onClick={() => setActiveRoleIndex(index)}
                      className={`min-w-[220px] border px-3 py-3 text-left transition-colors lg:min-w-0 lg:w-full ${
                        isActive ? 'border-orange-500/70 bg-orange-500/[0.08]' : 'border-slate-800 bg-[#0a0806] hover:border-amber-800'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="font-mono text-[10px] uppercase text-orange-400">{String(index + 1).padStart(2, '0')} / {entry.category}</span>
                      <span className="mt-2 block text-sm font-bold text-slate-100">{entry.role}</span>
                      <span className="mt-1 block text-xs text-slate-500">{entry.period}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article className="relative overflow-hidden border border-slate-800 bg-[#0d0a07]/90 p-5 sm:p-7">
              <div className="absolute inset-0 systems-grid opacity-[0.1]" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase text-orange-400">{activeRole.category} / {activeRole.period}</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-100 md:text-5xl">{activeRole.role}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{activeRole.organization}</p>
                <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {activeRole.impact.map((item, index) => (
                    <div key={item} className="border border-slate-800 bg-black/20 p-4">
                      <p className="font-mono text-[10px] uppercase text-slate-600">Impact {index + 1}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">The same habits carry into engineering: clarify the goal, distribute ownership, support the team, and stay close enough to the work to help.</p>
          <a href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300">See engineering work <ArrowRight className="w-4 h-4" /></a>
        </section>

        <NextRead
          title="See the work those habits shaped"
          description="Move from leadership style into the project archive, where the same clarity and ownership show up in shipped product systems."
          href="/work"
          cta="Open work"
          icon={Users}
        />
      </main>
    </div>
  );
}
