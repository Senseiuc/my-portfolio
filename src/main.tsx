import { lazy, StrictMode, Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'

declare global {
  interface Window {
    __senseiucRoot?: Root
  }
}

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

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

const hotRoot = import.meta.hot?.data.root as Root | undefined
const root = window.__senseiucRoot ?? hotRoot ?? createRoot(rootElement)
window.__senseiucRoot = root

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data.root = root
  })
}

root.render(
  <StrictMode>
    <Suspense fallback={<div role="status" className="min-h-screen bg-[#0a0806] px-4 py-16 font-mono text-sm text-slate-500">Loading portfolio...</div>}>
      <RouteComponent />
    </Suspense>
  </StrictMode>,
)
