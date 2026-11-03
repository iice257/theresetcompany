import type { Metadata, Viewport } from 'next';
import { Anton, Newsreader, IBM_Plex_Mono } from 'next/font/google';

import { SITE_URL } from '@/content/site';
import './globals.css';
import './v2.css';
const anton=Anton({subsets:['latin'],weight:'400',display:'swap',variable:'--font-anton'});
const news=Newsreader({subsets:['latin'],style:['normal','italic'],weight:'400',display:'swap',variable:'--font-news'});
const mono=IBM_Plex_Mono({subsets:['latin'],weight:['400','500'],display:'swap',variable:'--font-mono'});
const description="A highlight reel of Tibo's 28-day Codex sprint, and the potato who heckled it.";
export const metadata: Metadata={metadataBase:new URL(SITE_URL),icons:{icon:'/favicon.svg'},title:'The Reset Company',description,alternates:{canonical:SITE_URL},openGraph:{title:'The Reset Company',description,url:SITE_URL,siteName:'The Reset Company',type:'website',images:[{url:'/og.png',width:1200,height:630,alt:'The Reset Company. 28 days. 15 ships. 13 resets. One potato.'}]},twitter:{card:'summary_large_image',title:'The Reset Company',description,images:['/og.png']}};
export const viewport: Viewport={themeColor:'#F2EEE5',width:'device-width',initialScale:1};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={`${anton.variable} ${news.variable} ${mono.variable}`}><body>{children}<script src="/story.js" defer/></body></html>;}
