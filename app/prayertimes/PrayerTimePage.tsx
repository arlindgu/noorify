import React, { JSX } from "react";

import { SunDim, SunMedium, Sun, Sunset, MoonStar, Moon } from "lucide-react"
import { createClient } from '@/utils/supabase/server'
import { boolean } from "zod";
export async function getMosqueConfig() {
   const supabase = await createClient()
    let { data: mosque_config } = await supabase.from('mosque_config').select()
    return mosque_config
}

function createPrayerTime(name: string, dateString: string, icon: JSX.Element) {
  const date = new Date(dateString);
  return {
    name,
    time: date,
    icon,
    timePassed: new Date() > date,
    timeRemaining: calculateTimeRemaining(date),
    currentPrayer: boolean
  };
}


export async function getPrayerTimes() {
  const res = await fetch(
    "https://www.muwaqqit.com/api2.json?=&tz=Europe/Zurich&ln=9.0341907&lt=47.4584301&diptype=apparent&era=-16.0&ea=-19.0&eh=563.0&eo=563.0&fa=-19.0&fea=1.0&ia=4.5&isn=-10.0&k=0.155&p=1010.0&t=15.0&rsa=1.0&vc=5.65&zt=1.0",
    { cache: "no-store" }
  )

  const data = await res.json()

  const now = new Date()

const times = [
  createPrayerTime('Fajr', data.fajr, <SunDim />),
  createPrayerTime('Dhuhr', data.zohr, <Sun />),
  createPrayerTime('Asr', data.asr_shafi, <SunMedium />),
  createPrayerTime('Maghrib', data.sunset, <Sunset />),
  createPrayerTime('Isha', data.esha, <Moon />),
  createPrayerTime('Tahajjud', data.two_thirds_night, <MoonStar />),
];

  return times
}

// Einzelne Differenzberechnung für einen Zeitpunkt
export function calculateTimeRemaining(targetTime: Date) {
  const now = new Date()
  const diff = targetTime.getTime() - now.getTime()

  if (diff < 0) {
    return { hours: null, minutes: null, seconds: null }
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { hours, minutes, seconds }
}