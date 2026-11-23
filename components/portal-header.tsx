import { LiveDate } from './live-date'
import { CalendarDays, HeartHandshake, House, LayoutGrid, MapPin, Megaphone, MessageCircle, Sprout, HandHeart } from 'lucide-react'

export function Brand() {
  return (
    <a className="brand" href="#home">
      <span className="mark"><Sprout size={26} /></span>
      <span><strong>যোগীপাল</strong><small>সমাজকল্যাণ ফাউন্ডেশন</small></span>
    </a>
  )
}

const links = [['হোম', 'home'], ['সেবাসমূহ', 'services'], ['কার্যক্রম', 'activities'], ['খবর ও নোটিশ', 'news'], ['যুক্ত হোন', 'join'], ['যোগাযোগ', 'contact']]

export function Header() {
  return (
    <header id="home">
      <div className="top"><div className="wrap">
        <span><MapPin size={14} /> যোগীপাল, বাংলাদেশ</span>
        <span><CalendarDays size={14} /><LiveDate /></span>
      </div></div>
      <div className="wrap mast">
        <Brand />
        <nav aria-label="প্রধান নেভিগেশন">{links.map(([t, id]) => <a key={id} href={'#' + id}>{t}</a>)}</nav>
        <a className="btn" href="#donation"><HandHeart size={18} />অনুদান দিন</a>
      </div>
    </header>
  )
}

const mobile = [[House, 'হোম', 'home'], [LayoutGrid, 'সেবা', 'services'], [Megaphone, 'নোটিশ', 'news'], [HeartHandshake, 'যুক্ত হোন', 'join'], [MessageCircle, 'যোগাযোগ', 'contact']] as const

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="মোবাইল নেভিগেশন">
      {mobile.map(([Icon, text, id]) => <a href={'#' + id} key={id}><Icon size={21} />{text}</a>)}
    </nav>
  )
}
