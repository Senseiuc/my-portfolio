import React, { useEffect, useState } from 'react';
import { Github, GitPullRequest, Code, Star, RefreshCcw } from 'lucide-react';

interface LanguageShare {
  name: string;
  percentage: number;
}

interface RepoActivity {
  name: string;
  url: string;
  description: string;
  updatedAt: string;
}

interface GitMetrics {
  github: {
    publicRepos: number;
    starsCount: number;
    languages: LanguageShare[];
    recentActivity: RepoActivity[];
  };
  gitlab: {
    projectsCount: number;
    totalCommits: number;
  };
  lastUpdated: string;
  isFallback?: boolean;
}

export default function GitStats() {
  const [data, setData] = useState<GitMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGitMetrics = async () => {
    try {
      const response = await fetch('/api/git-metrics');
      if (!response.ok) throw new Error('API fetch failed');
      const metrics = await response.json();
      setData(metrics);
    } catch (err) {
      console.error('Failed to load live git metrics, using local sandbox fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitMetrics();
  }, []);

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'php': return 'bg-[#4f5d95]';
      case 'typescript': return 'bg-[#3178c6]';
      case 'javascript': return 'bg-[#f1e05a]';
      case 'python': return 'bg-[#3572a5]';
      default: return 'bg-[#8b5cf6]';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/40 border border-slate-800 rounded-xl h-60 text-slate-500 font-mono text-sm animate-pulse">
        <RefreshCcw className="w-5 h-5 animate-spin mb-2 text-indigo-400" />
        <span>Fetching Git Contribution Calendars...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a]/50 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md font-mono text-xs text-slate-300">
      {/* Title */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-slate-100 uppercase tracking-wider">GitHub & GitLab Contributions</span>
        </div>
        <span className="text-[9px] text-slate-500">
          Sync: Hourly
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Language Share & Repository Numbers */}
        <div>
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3 mb-3">
            <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">Repository Aggregations</div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 mb-2">
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>Repos: <strong>{data?.github.publicRepos}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-400" />
                <span>Stars: <strong>{data?.github.starsCount}</strong></span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 border-t border-slate-900 pt-2">
              <GitPullRequest className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitLab Commits: <strong>{data?.gitlab.totalCommits}</strong></span>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">Top Language Distributions</div>
            <div className="space-y-2">
              {data?.github.languages.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-850 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getLanguageColor(lang.name)}`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Public Repository Activity */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">Recent Workspace Pushes</div>
            <div className="space-y-3">
              {data?.github.recentActivity.map((activity, idx) => (
                <div key={idx} className="border-b border-slate-900/60 pb-2 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-cyan-400 hover:underline hover:text-cyan-300 truncate max-w-[150px]"
                    >
                      {activity.name}
                    </a>
                    <span className="text-[8px] text-slate-600">
                      {new Date(activity.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal truncate">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-slate-600 text-right pt-2 border-t border-slate-900 mt-2">
            Cache updated: {data ? new Date(data.lastUpdated).toLocaleTimeString() : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}
