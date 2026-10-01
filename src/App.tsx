import { useMemo, useState } from 'react'
import { recommend, unknownsFor, type Preferences, type Recommendation } from './lib/recommendations'

type Step = 'home' | 'preferences' | 'results'

const initial: Preferences = {
  age: '', children: '', location: 'Clarksville, TN', date: 'Today', customDate: '', distance: '20 minutes',
  interests: [], walking: 'Some', budget: "Doesn't matter", environment: 'Either', priorities: [], nap: 'No nap', customNap: '', timeOutside: 'Half day',
}
const interests = ['Playground', 'Water play', 'Indoor play', 'Nature', 'Animals', 'Trains/cars', 'Art/sensory', 'Books', 'Music', 'Learning/science']
const priorities = ['Easy parking', 'Restrooms nearby', 'Toddler-friendly', 'Stroller-friendly', 'Low walking', 'Food nearby', 'Quiet/less crowded', 'Water play']

function App() {
  const [step, setStep] = useState<Step>('home')
  const [form, setForm] = useState<Preferences>(initial)
  const [errors, setErrors] = useState<string[]>([])
  const [offset, setOffset] = useState(0)
  const candidates = useMemo(() => recommend(form), [form])
  const chosen = useMemo(() => {
    if (!candidates.length) return []
    return [0, 1, 2, 3].map((index) => candidates[(index + offset) % candidates.length]).filter((item): item is Recommendation => Boolean(item))
  }, [candidates, offset])

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) => setForm((current) => ({ ...current, [key]: value }))
  const toggle = (key: 'interests' | 'priorities', value: string) => {
    const current = form[key]
    update(key, current.includes(value) ? current.filter((item) => item !== value) : current.length < 3 ? [...current, value] : current)
  }
  const build = () => {
    const problems: string[] = []
    if (!form.age) problems.push('Choose your child’s age.')
    if (!form.children) problems.push('Choose the number of children.')
    if (!form.location) problems.push('Choose a location.')
    if (form.date === 'Custom date' && !form.customDate) problems.push('Choose a custom date.')
    if (form.nap === 'Custom' && !form.customNap) problems.push('Add a custom nap time.')
    setErrors(problems)
    if (!problems.length) { setOffset(0); setStep('results'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const startOver = () => { setForm(initial); setErrors([]); setOffset(0); setStep('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={startOver} aria-label="TinyTrip AI home"><span className="brand-mark">t</span><span>TinyTrip <b>AI</b></span></button>
        <div className="top-note"><span className="spark">✳</span> Little plans for big days</div>
        <button className="text-button" onClick={startOver}>Start Over <span aria-hidden="true">↗</span></button>
      </header>

      {step === 'home' && <main className="landing">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR DAY, MADE A LITTLE EASIER</div>
            <h1>What should we do<br />with the <span>kids today?</span></h1>
            <p>Tell us about your toddler and your day. We’ll build a personalized plan.</p>
            <button className="primary-button hero-button" onClick={() => setStep('preferences')}>Plan My Day <span>↗</span></button>
            <div className="no-login"><span>✓</span> No login needed <i /> Made for the in-between moments</div>
          </div>
          <div className="hero-art" aria-label="Illustration of a sunny day outdoors" role="img">
            <div className="sun" /><div className="art-cloud cloud-one" /><div className="art-cloud cloud-two" />
            <div className="hill hill-back" /><div className="hill hill-front" />
            <div className="tree tree-one"><i /><b /></div><div className="tree tree-two"><i /><b /></div>
            <div className="flower flower-one">✳</div><div className="flower flower-two">✿</div>
            <div className="kid kid-one"><i className="head"/><i className="body"/><i className="leg left"/><i className="leg right"/></div>
            <div className="kid kid-two"><i className="head"/><i className="body"/><i className="leg left"/><i className="leg right"/></div>
            <div className="art-caption"><span className="caption-icon">☼</span><span><b>A little more outside</b><small>One good plan at a time</small></span><span className="caption-arrow">↗</span></div>
          </div>
          <div className="hero-sticker">today<br /><span>looks good</span> <b>✳</b></div>
        </section>
        <section className="landing-footer"><span className="footer-line" /><span>GOOD DAYS DON’T NEED A BIG PLAN</span><span className="footer-line" /><div className="footer-features"><span>01 <b>Made for toddlers</b></span><span>02 <b>Works around nap time</b></span><span>03 <b>Close to home</b></span></div></section>
      </main>}

      {step === 'preferences' && <main className="form-page">
        <div className="page-heading"><button className="back-button" onClick={() => setStep('home')}>← <span>Back</span></button><div className="eyebrow"><span className="eyebrow-dot"/> FIRST, A LITTLE ABOUT YOUR DAY</div><h1>Let’s make a plan<br />that <span>fits your family.</span></h1><p>Pick what matters today. You can change it all next time.</p></div>
        {errors.length > 0 && <div className="error-box" role="alert"><b>Almost there</b><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
        <form className="preferences-form" onSubmit={(event) => { event.preventDefault(); build() }}>
          <div className="form-grid">
            <section className="form-card"><div className="card-number">01</div><div className="card-title"><h2>Your little crew</h2><p>Who are we planning for?</p></div>
              <Field label="Child’s age" required><Select value={form.age} onChange={(value) => update('age', value)} placeholder="Choose an age" options={['12–18 months', '18–24 months', '2–3 years', '3–5 years']} /></Field>
              <Field label="Number of children" required><div className="option-row">{['1', '2', '3+'].map((item) => <Pill key={item} selected={form.children === item} onClick={() => update('children', item)}>{item}</Pill>)}</div></Field>
            </section>
            <section className="form-card"><div className="card-number">02</div><div className="card-title"><h2>Where & when</h2><p>We’ll keep it close to home.</p></div>
              <Field label="Starting around" required><Select value={form.location} onChange={(value) => update('location', value as Preferences['location'])} options={['Clarksville, TN', 'Nashville, TN']} /></Field>
              <Field label="Day"><Select value={form.date} onChange={(value) => update('date', value)} options={['Today', 'Tomorrow', 'This weekend', 'Custom date']} /></Field>
              {form.date === 'Custom date' && <Field label="Choose a date" required><input className="control" type="date" value={form.customDate} onChange={(event) => update('customDate', event.target.value)} /></Field>}
              <Field label="How far feels doable?"><Select value={form.distance} onChange={(value) => update('distance', value)} options={['10 minutes', '20 minutes', '30 minutes', 'Anywhere nearby']} /></Field>
            </section>
            <section className="form-card span-two"><div className="card-number">03</div><div className="card-title"><h2>What sounds fun?</h2><p>Choose up to three. We’ll start with what your toddler loves.</p></div><TagGrid items={interests} selected={form.interests} onToggle={(item) => toggle('interests', item)} /><div className="selection-note">{form.interests.length} of 3 selected</div></section>
            <section className="form-card"><div className="card-number">04</div><div className="card-title"><h2>Keep it comfortable</h2><p>Every outing has its own pace.</p></div>
              <Field label="Walking"><Select value={form.walking} onChange={(value) => update('walking', value)} options={['Very little', 'Some', "Doesn't matter"]} /></Field>
              <Field label="Budget"><Select value={form.budget} onChange={(value) => update('budget', value)} options={['Free', 'Under $20', 'Under $40', 'Under $75', "Doesn't matter"]} /></Field>
              <Field label="Setting"><div className="option-row">{(['Indoor', 'Outdoor', 'Either'] as const).map((item) => <Pill key={item} selected={form.environment === item} onClick={() => update('environment', item)}>{item}</Pill>)}</div></Field>
            </section>
            <section className="form-card"><div className="card-number">05</div><div className="card-title"><h2>Little things that help</h2><p>Pick up to three nice-to-haves.</p></div><TagGrid items={priorities} selected={form.priorities} onToggle={(item) => toggle('priorities', item)} /><div className="selection-note">{form.priorities.length} of 3 selected</div></section>
            <section className="form-card"><div className="card-number">06</div><div className="card-title"><h2>Nap & down time</h2><p>We’ll leave space for a reset.</p></div>
              <Field label="Nap usually lands around"><Select value={form.nap} onChange={(value) => update('nap', value)} options={['No nap', '12–2', '1–3', '2–4', 'Custom']} /></Field>
              {form.nap === 'Custom' && <Field label="Nap time note" required><input className="control" placeholder="e.g. 12:30–2:00" value={form.customNap} onChange={(event) => update('customNap', event.target.value)} /></Field>}
              <Field label="Time out of the house"><Select value={form.timeOutside} onChange={(value) => update('timeOutside', value)} options={['2 hours', 'Half day', 'Most of the day']} /></Field>
            </section>
          </div>
          <div className="form-submit"><span>Just the details that make today easier.</span><button className="primary-button" type="submit">Build My Toddler Day <span>↗</span></button></div>
        </form>
      </main>}

      {step === 'results' && <Results preferences={form} chosen={chosen} onFindAnother={() => setOffset((value) => value + 1)} onStartOver={startOver} />}
      <footer className="site-footer"><span><span className="brand-mark small">t</span> TinyTrip AI</span><span>Made for the little trips that make a day.</span><span className="footer-flower">✳</span></footer>
    </div>
  )
}

function Results({ preferences, chosen, onFindAnother, onStartOver }: { preferences: Preferences; chosen: Recommendation[]; onFindAnother: () => void; onStartOver: () => void }) {
  const main = chosen[0]
  const afternoon = chosen[1]
  const backup = chosen[2]
  const unknowns = unknownsFor(preferences, chosen.map((item) => item))
  const dateLabel = preferences.date === 'Custom date' ? new Date(`${preferences.customDate}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : preferences.date
  return <main className="results-page">
    <div className="results-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> A THOUGHTFUL LITTLE ITINERARY</div><h1>Your toddler <span>day.</span></h1><p>A flexible plan, with room for snack breaks and surprises.</p></div><div className="date-chip"><span>✳</span> {dateLabel} <i/> {preferences.location.replace(', TN', '')}</div></div>
    <section className="summary-strip"><div><small>YOUR CREW</small><b>{preferences.children} {preferences.children === '1' ? 'little explorer' : 'little explorers'} · {preferences.age}</b></div><div><small>YOUR VIBE</small><b>{preferences.interests.length ? preferences.interests.join(' · ') : 'Open to a little of everything'}</b></div><div><small>YOUR PACE</small><b>{preferences.timeOutside} · {preferences.walking.toLowerCase()} walking</b></div><button onClick={onStartOver}>Edit details <span>↗</span></button></section>
    {main ? <div className="itinerary-layout"><section className="itinerary-main">
      <div className="section-label"><span>YOUR DAY, IN LITTLE CHAPTERS</span><i /></div>
      <ActivityCard label="MORNING ACTIVITY" number="01" recommendation={main} featured />
      <div className="timeline-row"><span className="timeline-dot">☕</span><div><small>PAUSE & REFUEL</small><h3>Lunch / meal break</h3><p>Keep lunch flexible. Nearby food and meal options: Unknown.</p></div><span className="pause-time">Easy does it</span></div>
      <div className="timeline-row nap-row"><span className="timeline-dot">☾</span><div><small>A RESET FOR EVERYONE</small><h3>Nap / quiet time</h3><p>{preferences.nap === 'No nap' ? 'Leave a little breathing room for downtime when your crew needs it.' : `Keep this part of the day open around ${preferences.nap === 'Custom' ? preferences.customNap : preferences.nap}.`}</p></div><span className="pause-time">{preferences.nap === 'No nap' ? 'When needed' : preferences.nap === 'Custom' ? preferences.customNap : preferences.nap}</span></div>
      {afternoon && <ActivityCard label="AFTERNOON ACTIVITY" number="02" recommendation={afternoon} />}
      {backup && <ActivityCard label="A LITTLE PLAN B" number="↗" recommendation={backup} compact />}
    </section><aside className="results-aside"><div className="cost-card"><span className="aside-icon">$</span><small>ESTIMATED TOTAL COST</small><strong>Unknown</strong><p>Prices for these placeholder activities: Unknown.</p></div><div className="aside-panel"><h3>Before you head out</h3><div className="aside-detail"><span>↗</span><div><b>Walking level</b><p>Unknown</p></div></div><div className="aside-detail"><span>⌖</span><div><b>Addresses & directions</b><p>Unknown</p></div></div><div className="aside-detail"><span>◷</span><div><b>Hours & availability</b><p>Unknown</p></div></div></div><div className="unknown-card"><span>✳ A NOTE ON THIS PLAN</span><ul>{unknowns.map((item) => <li key={item}>{item}</li>)}</ul><small>Sample activities are placeholders for the portfolio MVP.</small></div></aside></div> : <div className="empty-state"><span>✳</span><h2>No options in this sample yet.</h2><p>We don’t have activity examples for {preferences.location.replace(', TN', '')} in this placeholder set.</p><button className="primary-button" onClick={onStartOver}>Choose another location <span>↗</span></button></div>}
    <div className="results-actions"><button className="secondary-button" onClick={onStartOver}>Start Over</button><button className="primary-button" onClick={onFindAnother}>Find Another <span>↻</span></button></div>
  </main>
}

function ActivityCard({ label, number, recommendation, featured = false, compact = false }: { label: string; number: string; recommendation: Recommendation; featured?: boolean; compact?: boolean }) {
  const activity = recommendation.activity
  return <article className={`activity-card ${featured ? 'featured' : ''} ${compact ? 'compact' : ''}`}>
    <div className="activity-topline"><span>{label}</span><span className="activity-number">{number}</span></div>
    <div className="activity-heading"><div><h2>{activity.name}</h2><span className="category-chip">{activity.category}</span></div><span className="activity-art">{activity.city === 'Clarksville' ? '⌂' : '✳'}</span></div>
    <div className="activity-facts"><span>◷ {activity.durationMinutes ? `${activity.durationMinutes} min` : 'Duration: Unknown'}</span><span>↗ {activity.environment === 'unknown' ? 'Setting: Unknown' : activity.environment}</span><span>$ {activity.cost === null ? 'Cost: Unknown' : `$${activity.cost}`}</span></div>
    <div className="activity-description"><span>WHY IT MADE THE LIST</span><p>{recommendation.reasons.join(' · ')}. Placeholder details still need verification.</p></div>
    {!compact && <div className="activity-bottom"><span>{activity.amenities?.join(' · ') ?? 'Amenities: Unknown'}</span><span>{activity.address ?? 'Address: Unknown'}</span></div>}
  </article>
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) { return <label className="field"><span className="field-label">{label}{required && <i> · required</i>}</span>{children}</label> }
function Select({ value, onChange, options, placeholder }: { value: string; onChange: (value: string) => void; options: string[]; placeholder?: string }) { return <div className="select-wrap"><select className="control" value={value} onChange={(event) => onChange(event.target.value)}>{placeholder && <option value="">{placeholder}</option>}{options.map((option) => <option key={option}>{option}</option>)}</select><span>⌄</span></div> }
function Pill({ children, selected, onClick }: { children: React.ReactNode; selected: boolean; onClick: () => void }) { return <button type="button" className={`pill ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={onClick}>{children}</button> }
function TagGrid({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (item: string) => void }) { return <div className="tag-grid">{items.map((item) => <button type="button" key={item} className={`tag ${selected.includes(item) ? 'selected' : ''}`} aria-pressed={selected.includes(item)} onClick={() => onToggle(item)}>{selected.includes(item) && <span>✓</span>}{item}</button>)}</div> }

export default App
