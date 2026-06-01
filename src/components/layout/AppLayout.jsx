import { NavLink, Outlet } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Workspace', to: '/workspace' },
  { label: 'Publishing Flow', to: '/explore' },
  { label: 'Future AI Agents', to: '/agents' },
]

function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas-950 text-ink-100 selection:bg-brand-300 selection:text-canvas-950">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.2),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(16,185,129,0.15),transparent_35%)]" />

      <header className="sticky top-0 z-20 border-b border-line-700 bg-canvas-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <NavLink to="/" className="text-lg font-semibold tracking-wide text-brand-300">
            IdeaBoard
          </NavLink>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  buttonVariants({
                    variant: isActive ? 'default' : 'ghost',
                    size: 'sm',
                    className: isActive
                      ? 'pointer-events-none bg-brand-300 text-canvas-950 hover:bg-brand-200'
                      : 'text-ink-300 hover:bg-surface-800/65 hover:text-ink-50',
                  })
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-10 text-sm text-ink-400">
        Idea publishing dashboard MVP with room for AI agents later.
      </footer>
    </div>
  )
}

export default AppLayout
