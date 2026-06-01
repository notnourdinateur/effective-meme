import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm uppercase tracking-wider text-brand-300">404</p>
      <h1 className="text-4xl font-semibold text-ink-50">Page not found</h1>
      <p className="max-w-lg text-ink-300">The route does not exist yet. You can add it in App.jsx.</p>
      <Link
        to="/"
        className="rounded-full bg-brand-300 px-5 py-2.5 text-sm font-semibold text-canvas-950 transition hover:bg-brand-200"
      >
        Back home
      </Link>
    </section>
  )
}

export default NotFoundPage
