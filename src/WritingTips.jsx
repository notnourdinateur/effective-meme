function WritingTips({ text }) {
  const hasQuestion = text.includes('?')
  const hasHashtag = /#[\w-]+/.test(text)

  return (
    <section className="tips-panel" aria-label="Writing tips">
      <h4>Quick checklist</h4>
      <ul>
        <li className={text.length >= 40 ? 'done' : ''}>Open with a clear first sentence</li>
        <li className={hasQuestion ? 'done' : ''}>Ask a question to increase replies</li>
        <li className={hasHashtag ? 'done' : ''}>Use at least one relevant hashtag</li>
      </ul>
    </section>
  )
}

export default WritingTips
