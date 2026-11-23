import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata:Metadata={title:'যোগীপাল সমাজকল্যাণ ফাউন্ডেশন',description:'যোগীপাল সমাজকল্যাণ ফাউন্ডেশনের ডিজিটাল সমাজসেবা পোর্টাল। শিক্ষা, স্বাস্থ্য, মানবিক সহায়তা ও স্থানীয় কার্যক্রমের তথ্য জানুন।'}
export const viewport:Viewport={themeColor:'#075143',colorScheme:'light'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body className="antialiased">{children}</body></html>}
