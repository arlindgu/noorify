"use client";
import { SunDim, SunMedium, Sun, Sunset, MoonStar, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import '@/utils/exportHours';

export default function PrayerTimesPage() {

  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    fetch("https://www.muwaqqit.com/api2.json?=&d=2025-05-14&tz=Europe/Zurich&ln=9.0341907&lt=47.4584301&diptype=apparent&era=-16.0&ea=-19.0&eh=563.0&eo=563.0&fa=-19.0&fea=1.0&ia=4.5&isn=-10.0&k=0.155&p=1010.0&t=15.0&rsa=1.0&vc=5.65&zt=1.0")  // dein kompletter Link hier
      .then(res => res.json())
      .then(data => {
        setApiData(data);
      });
  }, []);

  const prayerTimes = [
    { name: 'Fajr', time: '6:00', icon: <SunDim /> },
    { name: 'Dhuhr', time: '12:00', icon: <Sun /> },
    { name: 'Asr', time: '15:30', icon: <SunMedium /> },
    { name: 'Maghrib', time: '18:00', icon: <Sunset /> },
    { name: 'Isha', time: '19:30', icon: <Moon /> },
    { name: 'Tahajjud', time: '03:00', icon: <MoonStar /> }]

  if (apiData) {
    console.log('apiData', apiData);
    prayerTimes[0].time = apiData.fajr.exportHours();
    prayerTimes[1].time = apiData.zohr.exportHours();
    prayerTimes[2].time = apiData.asr_hanafi.exportHours();
    prayerTimes[3].time = apiData.sunset.exportHours();
    prayerTimes[4].time = apiData.esha.exportHours();
    prayerTimes[5].time = apiData.two_thirds_night.exportHours();
  }



  return (
    <main className="">
      <div className="flex flex-wrap gap-4 align-center justify-center h-32">
        {prayerTimes.map((prayer) => (
          <div key={prayer.name} className="border rounded-md p-4 min-w-32 flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h2 className="font-bold break-words">{prayer.name}</h2>
              <span> {prayer.icon}</span>
            </div>
            <div>
              <span className='text-xs'>{prayer.time}</span>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}