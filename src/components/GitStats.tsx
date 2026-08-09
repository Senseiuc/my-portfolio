import React, { useEffect, useState } from 'react';
import { Code2, ExternalLink, Github, Layers3, RefreshCcw, Star } from 'lucide-react';

interface LanguageShare { name: string; percentage: number }

interface GitMetrics {
  github: {
    publicRepos: number;
    starsCount: number;
    languages: LanguageShare[];
    contributions?: { currentStreak: number; longestStreak: number; commitsThisYear: number } | null;
  };
  lastUpdated: string;
}

const languageColors: Record<string, string> = {
  php: 'bg-[#4f5d95]',
  typescript: 'bg-[#3178c6]',
  javascript: 'bg-[#f1e05a]',
  python: 'bg-[#3572a5]',
};

export default function GitStats() {
  const [data, setData] = useState<GitMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGitMetrics = async () => {
    try {
      const response = await fetch('/api/git-metrics');
      if (!response.ok) throw new Error('GitHub activity is unavailable');
      setData(await response.json());
      setError(false);
    } catch (requestError) {
      console.error('Failed to load public GitHub activity:', requestError);
      setData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGitMetrics(); }, []);

  if (loading) {
    return (
      <div className="flex h-60 flex-col items-center justify-center border border-slate-800 bg-slate-900/40 p-8 font-mono text-sm text-slate-500">
        <RefreshCcw className="mb-2 h-5 w-5 animate-spin text-orange-400" />
        <span>Reading public GitHub data...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-60 flex-col items-start justify-center border border-slate-800 bg-[#141110]/50 p-6">
        <Github className="h-5 w-5 text-slate-500" />
        <h3 className="mt-3 text-sm font-bold text-slate-200">GitHub activity unavailable</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">The GitHub API did not return current public data. No estimated values are shown.</p>
        <button type="button" onClick={fetchGitMetrics} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300">
          <RefreshCcw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="border border-slate-800 bg-[#141110]/50 p-5 font-mono text-xs text-slate-300">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2"><Github className="h-4 w-4 text-orange-400" /><span className="font-bold uppercase text-slate-100">Public GitHub activity</span></div>
        <span className="border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">GitHub API</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-slate-800/60 bg-slate-950/40 p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Layers3 className="h-3.5 w-3.5 text-orange-400" /> Public repositories</div>
          <div className="mt-2 text-xl font-bold text-slate-100">{data.github.publicRepos}</div>
        </div>
        <div className="border border-slate-800/60 bg-slate-950/40 p-3">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Star className="h-3.5 w-3.5 text-orange-400" /> Stars received</div>
          <div className="mt-2 text-xl font-bold text-slate-100">{data.github.starsCount}</div>
        </div>
      </div>

      <div className="mt-3 border border-slate-800/60 bg-slate-950/40 p-3">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500"><Code2 className="h-3.5 w-3.5" /> Repository language share</div>
        <div className="space-y-2">
          {data.github.languages.map((language) => (
            <div key={language.name}>
              <div className="mb-1 flex justify-between text-[10px]"><span>{language.name}</span><span>{language.percentage}%</span></div>
              <div className="h-1 overflow-hidden bg-slate-800"><div className={`h-full ${languageColors[language.name.toLowerCase()] ?? 'bg-slate-500'}`} style={{ width: `${language.percentage}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      {data.github.contributions && (
        <div className="mt-3 grid grid-cols-3 gap-2 border border-slate-800/60 bg-slate-950/40 p-3 text-center">
          <div><div className="text-[9px] text-slate-500">Current streak</div><div className="mt-1 font-bold text-slate-200">{data.github.contributions.currentStreak} days</div></div>
          <div><div className="text-[9px] text-slate-500">Longest streak</div><div className="mt-1 font-bold text-slate-200">{data.github.contributions.longestStreak} days</div></div>
          <div><div className="text-[9px] text-slate-500">Commits this year</div><div className="mt-1 font-bold text-slate-200">{data.github.contributions.commitsThisYear}</div></div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[10px] text-slate-500">
        <span>Updated {new Date(data.lastUpdated).toLocaleString()}</span>
        <a href="https://github.com/Senseiuc" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300">View profile <ExternalLink className="h-3 w-3" /></a>
      </div>
    </div>
  );
}
