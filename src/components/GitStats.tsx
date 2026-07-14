import React, { useEffect, useState } from 'react';
import { Github, GitPullRequest, Code, Star, RefreshCcw, Lock, Flame, Trophy, Layers } from 'lucide-react';

interface LanguageShare {
  name: string;
  percentage: number;
}

interface GitStreak {
  current: number;
  longest: number;
  totalCommits: number;
}

interface GitLabProject {
  name: string;
  description: string;
  lastActivity: string;
}

interface GitMetrics {
  github: {
    publicRepos: number;
    starsCount: number;
    languages: LanguageShare[];
    streak: GitStreak;
  };
  gitlab: {
    projectsCount: number;
    totalCommits: number;
    streak: GitStreak;
    activeProjects: GitLabProject[];
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
        <RefreshCcw className="w-5 h-5 animate-spin mb-2 text-orange-400" />
        <span>Fetching Git Contribution Calendars...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-mono text-xs text-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* GitHub Contributions Card */}
        <div className="bg-[#141110]/50 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-slate-100 uppercase tracking-wider">GitHub Contributions</span>
              </div>
              <span className="text-[9px] text-green-400 px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 uppercase tracking-wider font-mono animate-pulse">Live</span>
            </div>

            {/* Streak & Stats Widgets */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Flame className="w-4 h-4 text-orange-500 mb-1 animate-pulse" />
                <div className="text-[8px] text-slate-500">Current Streak</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.github.streak.current} Days</div>
              </div>
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-500 mb-1" />
                <div className="text-[8px] text-slate-500">Longest Streak</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.github.streak.longest} Days</div>
              </div>
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Code className="w-4 h-4 text-indigo-400 mb-1" />
                <div className="text-[8px] text-slate-500">Commits (YTD)</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.github.streak.totalCommits}</div>
              </div>
            </div>

            {/* Repository Aggregations */}
            <div className="bg-slate-950/20 border border-slate-850 rounded-lg p-3 mb-3">
              <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">Workspace Repositories</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-400" />
                  <span>Total Repos: <strong>{data?.github.publicRepos}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Total Stars: <strong>{data?.github.starsCount}</strong></span>
                </div>
              </div>
            </div>

            {/* Top Languages */}
            <div className="bg-slate-950/20 border border-slate-850 rounded-lg p-3">
              <div className="text-[10px] text-slate-500 mb-2.5 uppercase font-bold tracking-wider">Top Language Distributions</div>
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

          <div className="text-[8px] text-slate-600 text-right pt-3 mt-3 border-t border-slate-900/60">
            Updated: {data ? new Date(data.lastUpdated).toLocaleTimeString() : 'N/A'}
          </div>
        </div>

        {/* GitLab Contributions Card */}
        <div className="bg-[#141110]/50 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-100 uppercase tracking-wider">GitLab Contributions</span>
              </div>
              <span className="text-[9px] text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-wider font-mono animate-pulse">Enterprise</span>
            </div>

            {/* Streak & Stats Widgets */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Flame className="w-4 h-4 text-orange-500 mb-1 animate-pulse" />
                <div className="text-[8px] text-slate-500">Current Streak</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.gitlab.streak.current} Days</div>
              </div>
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-500 mb-1" />
                <div className="text-[8px] text-slate-500">Longest Streak</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.gitlab.streak.longest} Days</div>
              </div>
              <div className="bg-slate-950/40 border border-slate-850 rounded-lg p-2 flex flex-col items-center text-center justify-center">
                <Code className="w-4 h-4 text-indigo-400 mb-1" />
                <div className="text-[8px] text-slate-500">Commits (YTD)</div>
                <div className="font-bold text-slate-200 mt-0.5">{data?.gitlab.streak.totalCommits}</div>
              </div>
            </div>

            {/* Repository Aggregations */}
            <div className="bg-slate-950/20 border border-slate-850 rounded-lg p-3 mb-3">
              <div className="text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-wider">Enterprise Workspace</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Projects: <strong>{data?.gitlab.projectsCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Total Commits: <strong>{data?.gitlab.totalCommits}</strong></span>
                </div>
              </div>
            </div>

            {/* Active GitLab Projects */}
            <div className="bg-slate-950/20 border border-slate-850 rounded-lg p-3">
              <div className="text-[10px] text-slate-500 mb-2.5 uppercase font-bold tracking-wider">Active Enterprise Workspaces</div>
              <div className="space-y-2 text-[10px]">
                {data?.gitlab.activeProjects.map((project, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-1.5 border-b border-slate-900/60 last:border-b-0 last:pb-0">
                    <span className="font-bold text-slate-300 truncate max-w-[170px]">{project.name}</span>
                    <span className="text-[8px] text-slate-500 truncate max-w-[130px]">{project.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[8px] text-slate-600 text-right pt-3 mt-3 border-t border-slate-900/60">
            Source: az-gitlab.igbimo.com
          </div>
        </div>

      </div>
    </div>
  );
}
