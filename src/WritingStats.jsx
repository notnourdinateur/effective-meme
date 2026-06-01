function WritingStats({ text, maxLength }) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const remaining = maxLength - text.length
  const readSeconds = Math.max(1, Math.ceil(words / 3))

  return (
    <section className="stats-panel" aria-label="Post statistics">
      <div className="stats-item">
        <span className="stats-label">Words</span>
        <strong>{words}</strong>
      </div>
      <div className="stats-item">
        <span className="stats-label">Remaining</span>
        <strong className={remaining < 0 ? 'is-over-limit' : ''}>{remaining}</strong>
      </div>
      <div className="stats-item">
        <span className="stats-label">Read time</span>
        <strong>{readSeconds}s</strong>
      </div>
    </section>
  )
}

export default WritingStats
