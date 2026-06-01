const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    tasks: ['Build page routes', 'Create reusable UI primitives', 'Set up API client + hooks'],
  },
  {
    phase: 'Phase 2',
    title: 'Features',
    tasks: ['Content planner CRUD', 'Search and filter flows', 'Saved templates and tags'],
  },
  {
    phase: 'Phase 3',
    title: 'Growth',
    tasks: ['Analytics dashboards', 'Team collaboration', 'Webhook and third-party integrations'],
  },
]

function ExplorePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-accent-300">Explore the build path</p>
        <h1 className="text-3xl font-semibold text-ink-50 md:text-4xl">Roadmap to ship your full SPA</h1>
        <p className="max-w-2xl text-ink-300">
          Follow these phases in order. You can keep this structure while progressively swapping mock
          data with live API responses.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {roadmap.map((item) => (
          <article key={item.phase} className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">{item.phase}</p>
            <h2 className="mt-2 text-xl font-semibold text-ink-50">{item.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              {item.tasks.map((task) => (
                <li key={task} className="rounded-lg bg-surface-800/55 px-3 py-2">
                  {task}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExplorePage
