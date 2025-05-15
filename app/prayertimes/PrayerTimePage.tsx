import { SunDim, SunMedium, Sun, Sunset, MoonStar, Moon } from "lucide-react"

export async function getPrayerTimes() {
  const res = await fetch(
    "https://www.muwaqqit.com/api2.json?=&tz=Europe/Zurich&ln=9.0341907&lt=47.4584301&diptype=apparent&era=-16.0&ea=-19.0&eh=563.0&eo=563.0&fa=-19.0&fea=1.0&ia=4.5&isn=-10.0&k=0.155&p=1010.0&t=15.0&rsa=1.0&vc=5.65&zt=1.0",
    { cache: "no-store" }
  )

  const data = await res.json()

  const now = new Date()

  const times = [
    { name: 'Fajr', time: new Date(data.fajr), icon: <SunDim />, timePassed: now > new Date(data.fajr), timeRemaining: calculateTimeRemaining(new Date(data.fajr)) },
    { name: 'Dhuhr', time: new Date(data.zohr), icon: <Sun />, timePassed: now > new Date(data.zohr), timeRemaining: calculateTimeRemaining(new Date(data.zohr)) },
    { name: 'Asr', time: new Date(data.asr_shafi), icon: <SunMedium />, timePassed: now > new Date(data.asr_shafi), timeRemaining: calculateTimeRemaining(new Date(data.asr_shafi)) },
    { name: 'Maghrib', time: new Date(data.sunset), icon: <Sunset />, timePassed: now > new Date(data.sunset), timeRemaining: calculateTimeRemaining(new Date(data.sunset)) },
    { name: 'Isha', time: new Date(data.esha), icon: <Moon />, timePassed: now > new Date(data.esha), timeRemaining: calculateTimeRemaining(new Date(data.esha)) },
    { name: 'Tahajjud', time: new Date(data.two_thirds_night), icon: <MoonStar />, timePassed: now > new Date(data.two_thirds_night), timeRemaining: calculateTimeRemaining(new Date(data.two_thirds_night)) },
  ]

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