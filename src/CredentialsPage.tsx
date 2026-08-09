import { ArrowLeft, ExternalLink } from 'lucide-react';
import Logo from './components/Logo';

const CREDENTIALS = [
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
  return (
    <div className="min-h-screen bg-[#0a0806] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <a href="#credentials-list" className="skip-link">Skip to credentials</a>
      <div className="systems-grid fixed inset-0 pointer-events-none" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-amber-950/40 bg-[#0a0806]/92 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" aria-label="Gideon Nwadialu home">
            <Logo className="w-8 h-8" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase">GIDEON <span className="text-orange-400">NWADIALU</span></span>
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase text-slate-300 hover:text-orange-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </a>
        </div>
      </header>

      <main id="credentials-list" tabIndex={-1} className="relative z-10 max-w-5xl mx-auto px-4 py-10 md:py-16">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-amber-950/60 pb-10 md:pb-14">
          <div className="md:col-span-2">
            <img src="/senseiuc-section-certificate.png" alt="Senseiuc mascot holding a certificate" width="512" height="512" className="mascot mascot--celebrate w-32 sm:w-40 object-contain" />
          </div>
          <div className="md:col-span-10">
            <p className="font-mono text-xs uppercase text-orange-400">Licenses & certifications</p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">Structured learning,<br />applied in production.</h1>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
              Formal training across web foundations, Python data access, Django applications, automation, version control, and backend software engineering.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 border-y border-slate-800 divide-y divide-slate-800">
          {CREDENTIALS.map((credential, index) => (
            <article key={credential.id} className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7 py-7 first:pt-0 last:pb-0">
              <div className="md:col-span-2 font-mono text-xs text-orange-400">{String(index + 1).padStart(2, '0')} / {credential.issued}</div>
              <div className="md:col-span-7">
                <h2 className="text-xl font-bold text-slate-100">{credential.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{credential.specialization}</p>
                <p className="mt-3 font-mono text-xs text-slate-500">{credential.issuer} / Credential ID {credential.id}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {credential.skills.map((skill) => (
                    <span key={skill} className="border border-slate-800 px-2 py-1 text-[10px] font-mono text-slate-400">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 md:text-right">
                <a href={credential.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:text-orange-300 transition-colors">
                  Show credential <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="relative z-10 border-t border-amber-950/40 mt-10">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs font-mono text-slate-500">
          <span>Gideon Nwadialu / Credentials</span>
          <a href="https://www.linkedin.com/in/gideonnwadialu/details/certifications/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">View on LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
