import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Publish Ideas',
    description: 'Capture what you want to build and send it into a shared dashboard instantly.',
  },
  {
    title: 'Track Progress',
    description: 'Keep ideas organized with status, owner, and visibility fields.',
  },
  {
    title: 'AI Agents Later',
    description: 'Leave room for future agent assignment without blocking the MVP.',
  },
]

function HomePage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-8 rounded-3xl border border-line-700 bg-surface-900/75 p-8 shadow-2xl shadow-canvas-950/40 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-brand-400/45 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
            Idea publishing dashboard
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-ink-50 md:text-5xl">
            Publish ideas fast.
            <span className="block text-brand-300">Keep the next thing visible.</span>
          </h1>
          <p className="max-w-xl text-ink-300">
            IdeaBoard is a simple MVP dashboard for posting ideas, organizing them, and leaving space for
            future AI agents to help with the work later.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/workspace"
              className="rounded-full bg-brand-300 px-5 py-2.5 text-sm font-semibold text-canvas-950 transition hover:bg-brand-200"
            >
              Open Dashboard
            </Link>
            <Link
              to="/agents"
              className="rounded-full border border-line-600 px-5 py-2.5 text-sm font-semibold text-ink-50 transition hover:border-brand-300 hover:text-brand-200"
            >
              Future AI Agents
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line-700 bg-canvas-900/70 p-5">
          <p className="text-sm text-ink-300">What the MVP includes</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl bg-surface-800/55 p-3">Idea posting form with priority and category</li>
            <li className="rounded-xl bg-surface-800/55 p-3">Idea feed with visibility and status chips</li>
            <li className="rounded-xl bg-surface-800/55 p-3">Simple dashboard metrics for planning and review</li>
            <li className="rounded-xl bg-surface-800/55 p-3">Future slot for AI agent assignment</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-line-700 bg-surface-800/45 p-5">
            <h2 className="text-lg font-semibold text-brand-200">{item.title}</h2>
            <p className="mt-2 text-sm text-ink-300">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
