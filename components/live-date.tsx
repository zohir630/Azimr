'use client'
import {useEffect,useState} from 'react'
// স্ট্যাটিক সাইটে তারিখ বিল্ডের সময়ে আটকে যায়, তাই ব্রাউজারে আজকের তারিখ দেখানো হয়।
export function LiveDate(){const [date,setDate]=useState('');useEffect(()=>{setDate(new Intl.DateTimeFormat('bn-BD',{timeZone:'Asia/Dhaka',weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date()))},[]);return <>{date}</>}
