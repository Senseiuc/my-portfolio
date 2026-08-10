import { lazy, StrictMode, Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'

type RootElement = HTMLElement & { __senseiucRoot?: Root }

const App = lazy(() => import('./App.tsx'))
const KongaCaseStudyPage = lazy(() => import('./KongaCaseStudyPage.tsx'))
const WorkPage = lazy(() => import('./WorkPage.tsx'))
const BeforeSystemsPage = lazy(() => import('./BeforeSystemsPage.tsx'))
const CredentialsPage = lazy(() => import('./CredentialsPage.tsx'))
const LeadershipPage = lazy(() => import('./LeadershipPage.tsx'))
const SystemsPage = lazy(() => import('./SystemsPage.tsx'))
const ConsolePage = lazy(() => import('./ConsolePage.tsx'))
const LifePage = lazy(() => import('./LifePage.tsx'))

const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

const RouteComponent = currentPath === '/work/konga-merchant-platform'
  ? KongaCaseStudyPage
  : currentPath === '/work'
    ? WorkPage
    : currentPath === '/before-systems'
      ? BeforeSystemsPage
      : currentPath === '/credentials'
        ? CredentialsPage
        : currentPath === '/leadership'
          ? LeadershipPage
          : currentPath === '/systems'
            ? SystemsPage
              : currentPath === '/console'
                ? ConsolePage
                : currentPath === '/life'
                  ? LifePage
              : App

const rootElement = document.getElementById('root') as RootElement
const root = rootElement.__senseiucRoot ?? createRoot(rootElement)
rootElement.__senseiucRoot = root

root.render(
  <StrictMode>
    <Suspense fallback={<div role="status" className="min-h-screen bg-[#0a0806] px-4 py-16 font-mono text-sm text-slate-500">Loading portfolio...</div>}>
      <RouteComponent />
    </Suspense>
  </StrictMode>,
)
