'use client'
import { useState, useRef, type FormEvent } from 'react'
import { ArrowRight, ChevronRight, BellRing, Leaf, Megaphone, X, Newspaper, Activity, HandHeart, MapPin, Phone, Send } from 'lucide-react'
import { asset } from '@/lib/asset'
import { saveVolunteer } from '@/lib/firebase'
import { Hero } from './portal-hero'
import { Brand } from './portal-header'
import { services, activities, notices, type Detail } from './portal-data'

const steps = [
  ['আগ্রহের ক্ষেত্র বাছুন', 'শিক্ষা, স্বাস্থ্য বা পরিবেশ — যেখানে সময় দিতে চান।'],
  ['ফর্মটি পূরণ করুন', 'নাম, ফোন নম্বর ও সংক্ষিপ্ত বার্তা পাঠান।'],
  ['প্রতিনিধির সঙ্গে কথা বলুন', 'স্থানীয় সমন্বয়কের সঙ্গে আলোচনা করে কাজ শুরু করুন।'],
]
const faqs = [
  ['কীভাবে স্বেচ্ছাসেবক হওয়া যায়?', services[5].body],
  ['অনুদান কীভাবে দেব?', 'বই, খাতা, পোশাক বা প্রয়োজনীয় সামগ্রী দিয়ে সহায়তা করা যায়। এই পোর্টালে সরাসরি অর্থ গ্রহণ করা হয় না। দেওয়ার আগে স্থানীয় প্রতিনিধির পরিচয় যাচাই করুন এবং রসিদ সংগ্রহ করুন।'],
  ['রক্তদানের আগে কী করব?', services[2].body],
  ['জরুরি সহায়তা কোথায় পাব?', 'জরুরি অবস্থায় ৯৯৯ এবং স্বাস্থ্য পরামর্শের জন্য ১৬২৬৩ নম্বরে ফোন করুন।'],
]

export function Portal() {
  const [all, setAll] = useState(false)
  const [more, setMore] = useState(false)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<{ text: string; err: boolean } | null>(null)
  const [busy, setBusy] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  function show(d: Detail) { setDetail(d); if (!dialog.current?.open) dialog.current?.showModal() }
  function search(q: string) { setDetail(null); setQuery(q); if (!dialog.current?.open) dialog.current?.showModal() }
  const results = [...services, ...notices, ...activities].filter(i => i.title.includes(query) || i.body.includes(query))

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const d = new FormData(f)
    const data = { name: String(d.get('name') ?? '').trim(), phone: String(d.get('phone') ?? '').trim(), interest: String(d.get('interest') ?? ''), message: String(d.get('message') ?? '').trim() }
    if (data.name.length < 2) return setStatus({ text: 'অনুগ্রহ করে আপনার নাম লিখুন।', err: true })
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(data.phone.replace(/[\s-]/g, ''))) return setStatus({ text: 'সঠিক মোবাইল নম্বর দিন (যেমন 01XXXXXXXXX)।', err: true })
    setBusy(true)
    const r = await saveVolunteer(data)
    setBusy(false)
    if (r.ok) { f.reset(); setStatus({ text: 'ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।', err: false }) }
    else setStatus({ text: 'ফর্ম জমা নেওয়ার সুবিধা শীঘ্রই চালু হবে। আপাতত স্থানীয় প্রতিনিধির সঙ্গে যোগাযোগ করুন।', err: true })
  }

  return (
    <>
      <main>
        <Hero search={search} />
        <div className="wrap">
          <div className="bulletin">
            <span className="tag"><Megaphone size={16} /> বিজ্ঞপ্তি</span>
            <button onClick={() => show(notices[0])}>স্বেচ্ছাসেবী কাজে আগ্রহীদের জন্য তথ্য ও নির্দেশিকা</button>
            <a href="#news">সকল নোটিশ <ChevronRight size={16} /></a>
          </div>

          <section id="services" className="block">
            <div className="head">
              <div><div className="kicker">সেবা পোর্টাল</div><h2>আমাদের সেবাসমূহ</h2></div>
              <button className="more" onClick={() => setAll(!all)} aria-expanded={all}>{all ? 'কম দেখুন' : 'সকল সেবা'} <ArrowRight size={16} /></button>
            </div>
            <div className="service-grid">
              {services.slice(0, all ? 8 : 6).map(({ icon: Icon, ...s }) => (
                <button className={'service ' + s.tone} onClick={() => show(s)} key={s.title}>
                  <span className="tile"><Icon /></span><strong>{s.title}</strong><small>{s.sub}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="block" aria-label="যুক্ত হওয়ার ধাপ">
            <div className="head"><div><div className="kicker">সহজ তিন ধাপ</div><h2>আমাদের সঙ্গে কাজ করবেন যেভাবে</h2></div></div>
            <div className="steps">{steps.map(([t, p], i) => <div className="step" key={t}><b>{(i + 1).toLocaleString('bn-BD')}</b><strong>{t}</strong><p>{p}</p></div>)}</div>
          </section>

          <div className="block updates">
            <section id="activities">
              <div className="head">
                <h2 className="ico"><Leaf />আমাদের কার্যক্রম</h2>
                <button className="more" onClick={() => setMore(!more)}>{more ? 'কম দেখুন' : 'সব দেখুন'} <ArrowRight size={15} /></button>
              </div>
              <div className="story-grid">
                {activities.slice(0, more ? 3 : 2).map((a, i) => (
                  <button className="story" key={a.title} onClick={() => show(a)}>
                    <img src={asset('activity-' + i + '.webp')} alt="" loading="lazy" /><span>{a.tag}</span><strong>{a.title}</strong>
                  </button>
                ))}
              </div>
            </section>
            <section id="news">
              <div className="head"><h2 className="ico"><Newspaper />খবর ও নোটিশ</h2></div>
              <div className="news-list">
                {notices.map(n => (
                  <button key={n.title} onClick={() => show(n)}>
                    <span className="newsicon"><BellRing size={20} /></span>
                    <span><small>{n.tag}</small><strong>{n.title}</strong></span><ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section id="join" className="block">
            <div className="join">
              <div>
                <div className="kicker">স্বেচ্ছাসেবক ফর্ম</div>
                <h2>আমাদের সঙ্গে যুক্ত হোন</h2>
                <p>আপনার সময় ও দক্ষতা দিয়ে এলাকার মানুষের পাশে দাঁড়ান। ফর্মটি পূরণ করুন, আমরা যোগাযোগ করব।</p>
              </div>
              <form className="form" onSubmit={submit} noValidate>
                <label>আপনার নাম<input name="name" autoComplete="name" placeholder="পূর্ণ নাম" /></label>
                <label>মোবাইল নম্বর<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" /></label>
                <label>আগ্রহের ক্ষেত্র<select name="interest">{['শিক্ষা', 'স্বাস্থ্য', 'রক্তদান', 'পরিবেশ', 'মানবিক সহায়তা'].map(o => <option key={o}>{o}</option>)}</select></label>
                <label>বার্তা (ঐচ্ছিক)<textarea name="message" rows={3} placeholder="আপনার কথা লিখুন" /></label>
                <button className="btn" disabled={busy}><Send size={16} />{busy ? 'পাঠানো হচ্ছে...' : 'জমা দিন'}</button>
                {status && <p className={'msg' + (status.err ? ' err' : '')} role="status">{status.text}</p>}
              </form>
            </div>
          </section>

          <section id="faq" className="block">
            <div className="head"><div><div className="kicker">সাধারণ জিজ্ঞাসা</div><h2>প্রায়ই জিজ্ঞাসিত প্রশ্ন</h2></div></div>
            <div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          </section>

          <section className="giving" id="donation">
            <HandHeart size={42} />
            <div><h2>আপনার সহযোগিতা, কারও নতুন আশা</h2><p>শিক্ষা উপকরণ, সময় বা অনুদান দিয়ে মানুষের পাশে দাঁড়ান।</p></div>
            <button className="btn gold" onClick={() => show({ title: 'অনুদানের নির্দেশিকা', body: faqs[1][1] })}>অনুদানের নির্দেশিকা <ArrowRight size={17} /></button>
          </section>
        </div>
      </main>

      <footer id="contact">
        <div className="wrap">
          <div className="footer-grid">
            <div><Brand /><p>মানুষের পাশে, সমাজের কল্যাণে।</p></div>
            <div><h3>যোগাযোগ</h3><p><MapPin size={16} /> যোগীপাল, বাংলাদেশ</p><p>স্থানীয় প্রতিনিধির মাধ্যমে যোগাযোগ করুন।</p></div>
            <div><h3>প্রয়োজনীয় যোগাযোগ</h3><a href="tel:999"><Phone size={15} />জাতীয় জরুরি সেবা — ৯৯৯</a><a href="tel:16263"><Activity size={15} />স্বাস্থ্য বাতায়ন — ১৬২৬৩</a></div>
          </div>
          <div className="copy">© যোগীপাল সমাজকল্যাণ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</div>
        </div>
      </footer>

      <dialog ref={dialog} aria-labelledby="dialog-title" onClick={e => { if (e.target === dialog.current) dialog.current.close() }}>
        <div className="dialog-inner">
          <button aria-label="বন্ধ করুন" className="close" onClick={() => dialog.current?.close()}><X size={20} /></button>
          <div className="kicker">সমাজসেবা পোর্টাল</div>
          <h2 id="dialog-title">{detail?.title ?? 'অনুসন্ধানের ফলাফল'}</h2>
          {detail ? <p>{detail.body}</p> : (
            <>
              <label className="searchlabel">খোঁজার বিষয়<input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="সেবার নাম লিখুন" /></label>
              <p>{results.length.toLocaleString('bn-BD')}টি ফলাফল</p>
              <div className="resultlist">{results.map(r => <button key={r.title} onClick={() => show(r)}>{r.title}<ChevronRight size={16} /></button>)}</div>
              {!results.length && <p>অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।</p>}
            </>
          )}
        </div>
      </dialog>
    </>
  )
}
