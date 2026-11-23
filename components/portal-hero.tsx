'use client'
import { useEffect, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Leaf } from 'lucide-react'
import { asset } from '@/lib/asset'

const slides = [
  ['মানুষের পাশে,', 'সমাজের কল্যাণে', 'শিক্ষা, স্বাস্থ্য ও মানবিক সেবায় আপনার বিশ্বস্ত সহযোগী।', 'village.webp'],
  ['শিক্ষার আলো,', 'সবার ঘরে', 'শিক্ষা উপকরণ ও সহযোগিতায় এগিয়ে যাক প্রতিটি শিশু।', 'activity-0.webp'],
  ['সবুজের যত্নে,', 'আগামীর জন্য', 'দেশীয় গাছ লাগাই, একসঙ্গে গড়ি সবুজ গ্রাম।', 'activity-2.webp'],
]

export function Hero({ search }: { search: (q: string) => void }) {
  const [idx, setIdx] = useState(0)
  const [q, setQ] = useState('')
  const [paused, setPaused] = useState(false)
  const n = slides.length
  const s = slides[idx]

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <section className="hero" aria-label="ফাউন্ডেশনের পরিচিতি" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <img key={s[3]} className="scene" src={asset(s[3])} alt="" fetchPriority="high" />
      <div className="shade" />
      <div className="wrap hero-inner">
        <span className="eyebrow"><Leaf size={14} /> ডিজিটাল সমাজসেবা পোর্টাল</span>
        <h1>{s[0]}<br /><em>{s[1]}</em></h1>
        <p>{s[2]}</p>
        <form className="searchbox" onSubmit={e => { e.preventDefault(); search(q.trim()) }}>
          <Search size={20} />
          <input value={q} onChange={e => setQ(e.target.value)} aria-label="সেবা, তথ্য বা নোটিশ খুঁজুন" placeholder="সেবা, তথ্য বা নোটিশ খুঁজুন..." />
          <button type="submit">খুঁজুন</button>
        </form>
        <div className="ctrl">
          <div className="dots">{slides.map((_, i) => <button key={i} className={idx === i ? 'on' : ''} aria-label={'ব্যানার ' + (i + 1).toLocaleString('bn-BD')} aria-pressed={idx === i} onClick={() => setIdx(i)} />)}</div>
          <div className="arrows">
            <button aria-label="পূর্ববর্তী ব্যানার" onClick={() => setIdx((idx + n - 1) % n)}><ChevronLeft size={18} /></button>
            <button aria-label="পরবর্তী ব্যানার" onClick={() => setIdx((idx + 1) % n)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
