import { useMemo, useState } from 'react'

const seedIdeas = [
  {
    id: 1,
    title: 'Launch a weekly founder newsletter',
    summary: 'Share build updates, lessons, and product experiments with a small audience.',
    category: 'Content',
    priority: 'High',
    visibility: 'Public',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Create a customer onboarding checklist',
    summary: 'Reduce confusion for new users by turning the first session into a guided flow.',
    category: 'Product',
    priority: 'Medium',
    visibility: 'Team',
    status: 'Draft',
  },
  {
    id: 3,
    title: 'Prepare an AI-assisted research assistant',
    summary: 'Later, an agent could collect research and draft briefs from published ideas.',
    category: 'AI',
    priority: 'Low',
    visibility: 'Public',
    status: 'Planned',
  },
]

function WorkspacePage() {
  const [ideas, setIdeas] = useState(seedIdeas)
  const [form, setForm] = useState({
    title: '',
    summary: '',
    category: 'Product',
    priority: 'Medium',
    visibility: 'Public',
  })

  const stats = useMemo(() => {
    const published = ideas.filter((idea) => idea.status === 'Published').length
    const draft = ideas.filter((idea) => idea.status === 'Draft').length

    return {
      total: ideas.length,
      published,
      draft,
    }
  }, [ideas])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.title.trim() || !form.summary.trim()) {
      return
    }

    setIdeas((currentIdeas) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        summary: form.summary.trim(),
        category: form.category,
        priority: form.priority,
        visibility: form.visibility,
        status: 'Published',
      },
      ...currentIdeas,
    ])

    setForm({
      title: '',
      summary: '',
      category: 'Product',
      priority: 'Medium',
      visibility: 'Public',
    })
  }

  function removeIdea(ideaId) {
    setIdeas((currentIdeas) => currentIdeas.filter((idea) => idea.id !== ideaId))
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wider text-success-300">Dashboard</p>
          <h1 className="text-3xl font-semibold text-ink-50">Publish ideas</h1>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <p className="text-sm text-ink-300">Ideas posted</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink-50">{stats.total}</h2>
        </article>
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <p className="text-sm text-ink-300">Published now</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink-50">{stats.published}</h2>
        </article>
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <p className="text-sm text-ink-300">Drafts waiting</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink-50">{stats.draft}</h2>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form className="rounded-2xl border border-line-700 bg-surface-900/70 p-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-brand-300">New idea</p>
              <h2 className="mt-1 text-xl font-semibold text-ink-50">Post something worth building</h2>
            </div>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-line-600 bg-canvas-900 px-3 py-2 text-sm text-ink-50 outline-none ring-brand-300/70 placeholder:text-ink-500 focus:ring"
              placeholder="Idea title"
            />

            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-xl border border-line-600 bg-canvas-900 px-3 py-2 text-sm text-ink-50 outline-none ring-brand-300/70 placeholder:text-ink-500 focus:ring"
              placeholder="What should people know about this idea?"
            />

            <div className="grid gap-3 sm:grid-cols-3">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="rounded-xl border border-line-600 bg-canvas-900 px-3 py-2 text-sm text-ink-50 outline-none"
              >
                <option>Product</option>
                <option>Content</option>
                <option>AI</option>
                <option>Growth</option>
              </select>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="rounded-xl border border-line-600 bg-canvas-900 px-3 py-2 text-sm text-ink-50 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="rounded-xl border border-line-600 bg-canvas-900 px-3 py-2 text-sm text-ink-50 outline-none"
              >
                <option>Public</option>
                <option>Team</option>
                <option>Private</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-300 px-4 py-2.5 text-sm font-semibold text-canvas-950 transition hover:bg-brand-200"
            >
              Publish idea
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-brand-300">Idea feed</p>
              <h2 className="mt-1 text-xl font-semibold text-ink-50">Shared ideas</h2>
            </div>
            <p className="text-sm text-ink-400">AI agents coming later</p>
          </div>

          <div className="mt-5 space-y-4">
            {ideas.map((idea) => (
              <article key={idea.id} className="rounded-2xl border border-line-700 bg-canvas-900/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-300">
                      {idea.category} · {idea.priority}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-ink-50">{idea.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-ink-300">
                    <span className="rounded-full bg-surface-800/70 px-2.5 py-1">{idea.visibility}</span>
                    <span className="rounded-full bg-surface-800/70 px-2.5 py-1">{idea.status}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-ink-300">{idea.summary}</p>

                <button
                  type="button"
                  onClick={() => removeIdea(idea.id)}
                  className="mt-4 rounded-full border border-line-600 px-3 py-1.5 text-xs font-medium text-ink-100 transition hover:border-brand-300 hover:text-brand-200"
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkspacePage
