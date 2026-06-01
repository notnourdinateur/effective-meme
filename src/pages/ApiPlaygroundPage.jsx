function ApiPlaygroundPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wider text-brand-300">Future feature</p>
        <h1 className="text-3xl font-semibold text-ink-50">AI agents later</h1>
        <p className="mt-2 max-w-2xl text-ink-300">
          This dashboard leaves space for AI agents that can research, draft, and organize ideas later.
          For now, the MVP is focused on posting ideas and keeping them visible.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <h2 className="text-lg font-semibold text-ink-50">Research agent</h2>
          <p className="mt-2 text-sm text-ink-300">Could gather notes, references, and competitor ideas.</p>
        </article>
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <h2 className="text-lg font-semibold text-ink-50">Draft agent</h2>
          <p className="mt-2 text-sm text-ink-300">Could turn rough ideas into publishable drafts later.</p>
        </article>
        <article className="rounded-2xl border border-line-700 bg-surface-900/70 p-5">
          <h2 className="text-lg font-semibold text-ink-50">Review agent</h2>
          <p className="mt-2 text-sm text-ink-300">Could check clarity, tone, and completeness before publishing.</p>
        </article>
      </div>
    </section>
  )
}

export default ApiPlaygroundPage
