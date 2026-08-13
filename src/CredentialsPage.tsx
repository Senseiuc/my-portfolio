import { useRef, useState } from 'react';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';
import NextRead from './components/NextRead';
import SiteHeader from './components/SiteHeader';

const CREDENTIALS = [
  {
    title: 'BSc Mathematics',
    specialization: 'Undergraduate study in mathematics, quantitative reasoning, and problem solving.',
    issuer: 'University of Lagos',
    issued: 'Academic degree',
    id: null,
    url: null,
    skills: ['Mathematics', 'Problem Solving', 'Quantitative Reasoning'],
  },
  {
    title: 'ALX Software Engineering Programme',
    specialization: 'Specialization in Back End Development',
    issuer: 'ALX Africa',
    issued: 'September 2023',
    id: 'yzNECc35M8',
    url: 'https://savanna.alxafrica.com/certificates/yzNECc35M8',
    skills: ['Backend Engineering', 'Python', 'Project Management'],
  },
  {
    title: 'Google IT Automation with Python Specialization',
    specialization: 'Automation, Git, systems administration, and Python',
    issuer: 'Google',
    issued: 'April 2021',
    id: 'SVDCQ9UBXD8V',
    url: 'https://www.coursera.org/account/accomplishments/specialization/SVDCQ9UBXD8V',
    skills: ['Python', 'Git', 'GitHub', 'Automation'],
  },
  {
    title: 'Web Application Technologies and Django',
    specialization: 'Server-side web application development',
    issuer: 'Coursera',
    issued: 'November 2020',
    id: 'MM5GCQ9URH72',
    url: 'https://www.coursera.org/account/accomplishments/certificate/MM5GCQ9URH72',
    skills: ['Django', 'Web Applications', 'Python'],
  },
  {
    title: 'Using Python to Access Web Data',
    specialization: 'HTTP, APIs, structured data, and web access with Python',
    issuer: 'Coursera',
    issued: 'November 2020',
    id: 'WUEL97SVZJKY',
    url: 'https://www.coursera.org/account/accomplishments/certificate/WUEL97SVZJKY',
    skills: ['Python', 'APIs', 'Web Data'],
  },
  {
    title: 'Introduction to HTML5',
    specialization: 'Semantic structure and web foundations',
    issuer: 'Coursera',
    issued: 'November 2020',
    id: 'U7B9GMJ8XAM8',
    url: 'https://www.coursera.org/account/accomplishments/certificate/U7B9GMJ8XAM8',
    skills: ['HTML5', 'Web Standards', 'Accessibility'],
  },
];

export default function CredentialsPage() {
  const [activeCredentialIndex, setActiveCredentialIndex] = useState(0);
  const credentialDetailRef = useRef<HTMLElement>(null);
  const activeCredential = CREDENTIALS[activeCredentialIndex];
  const isAcademicDegree = !activeCredential.url;
  const CredentialIcon = isAcademicDegree ? GraduationCap : Award;

  const handleCredentialSelect = (index: number) => {
    if (index === activeCredentialIndex) return;
    setActiveCredentialIndex(index);
    requestAnimationFrame(() => {
      credentialDetailRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#credentials-list" className="skip-link">Skip to academics and credentials</a>
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader />

      <main id="credentials-list" tabIndex={-1} className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-16">
        <section className="relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 border-b border-amber-950/60 pb-8 md:pb-14">
          <div className="absolute right-0 top-8 md:static md:col-span-2">
            <img src="/senseiuc-section-certificate.png" alt="Senseiuc mascot holding a certificate" width="512" height="512" className="mascot mascot--celebrate w-28 sm:w-32 md:w-40 object-contain" />
          </div>
          <div className="md:col-span-10">
            <p className="font-mono text-xs uppercase text-orange-400">Academics & credentials</p>
            <h1 className="mt-3 pr-32 text-[2.55rem] font-extrabold leading-[1.08] sm:pr-36 sm:text-5xl md:pr-0 md:text-6xl md:leading-tight">Structured learning,<br />applied in production.</h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
              Academic grounding in mathematics, followed by formal training across web foundations, Python, automation, version control, and backend software engineering.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-14">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[310px_1fr] lg:items-start">
            <div className="sticky top-[76px] z-30 bg-[#0a0806]/95 py-2 backdrop-blur-md lg:top-24 lg:bg-transparent lg:py-0 lg:backdrop-blur-none">
              <p className="font-mono text-xs uppercase text-orange-400">Academic and credential stack</p>
              <div className="mt-4 flex gap-2 overflow-x-auto border-y border-slate-800 py-2 lg:block lg:space-y-2 lg:overflow-visible lg:border lg:p-2">
                {CREDENTIALS.map((credential, index) => {
                  const isActive = index === activeCredentialIndex;
                  return (
                    <button
                      key={credential.title}
                      type="button"
                      onClick={() => handleCredentialSelect(index)}
                      className={`min-w-[245px] border px-3 py-3 text-left transition-colors lg:min-w-0 lg:w-full ${
                        isActive ? 'border-orange-500/70 bg-orange-500/[0.08]' : 'border-slate-800 bg-[#0a0806] hover:border-amber-800'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="font-mono text-[10px] uppercase text-orange-400">{String(index + 1).padStart(2, '0')} / {credential.issued}</span>
                      <span className="mt-2 block text-sm font-bold text-slate-100">{credential.title}</span>
                      <span className="mt-1 block text-xs text-slate-500">{credential.issuer}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article ref={credentialDetailRef} className="relative scroll-mt-60 overflow-hidden border border-slate-800 bg-[#0d0a07]/90 p-5 sm:p-7 md:scroll-mt-24 lg:sticky lg:top-24">
              <div className="absolute inset-0 systems-grid opacity-[0.1]" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/50 bg-orange-500/[0.08] text-orange-400">
                    <CredentialIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase text-orange-400">{isAcademicDegree ? 'Academic degree' : 'Professional certificate'}</p>
                    <h2 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight text-slate-100 md:text-4xl">{activeCredential.title}</h2>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 sm:grid-cols-3">
                  {[
                    ['Issuer', activeCredential.issuer],
                    ['Date', activeCredential.issued],
                    ['Type', isAcademicDegree ? 'Degree' : 'Certificate'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0a0806] p-3">
                      <dt className="font-mono text-[10px] uppercase text-slate-600">{label}</dt>
                      <dd className="mt-1 text-sm font-bold text-slate-200">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 border-l border-orange-500/60 pl-4">
                  <p className="font-mono text-[10px] uppercase text-slate-500">Focus</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{activeCredential.specialization}</p>
                </div>
                {activeCredential.id && (
                  <p className="mt-5 font-mono text-xs text-slate-500">Credential ID {activeCredential.id}</p>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeCredential.skills.map((skill) => (
                    <span key={skill} className="border border-slate-800 bg-black/20 px-3 py-1.5 text-[11px] font-mono text-slate-300">{skill}</span>
                  ))}
                </div>
                {activeCredential.url && (
                  <a href={activeCredential.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 bg-orange-500 px-4 py-2.5 text-sm font-bold text-[#0a0806] transition-colors hover:bg-orange-400">
                    Show credential <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          </div>
        </section>

        <NextRead
          title="Trace the learning into shipped systems"
          description="The academic and credential stack shows foundations. The project archive shows how those foundations became production software across the full stack."
          href="/work"
          cta="Open work"
          icon={ExternalLink}
        />
      </main>

      <footer className="relative z-10 border-t border-amber-950/40 mt-10">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs font-mono text-slate-500">
          <span>Gideon Nwadialu / Academics & credentials</span>
          <a href="https://www.linkedin.com/in/gideonnwadialu/details/certifications/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">View on LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
