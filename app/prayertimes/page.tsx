import { SunDim, SunMedium, Sun, Sunset, MoonStar, Moon  } from "lucide-react";

export default function PrayerTimesPage() {


    const prayerTimes = [
        { name: 'Fajr', time: '05:00', icon: <SunDim /> },
        { name: 'Dhuhr', time: '12:00', icon: <Sun /> },
        { name: 'Asr', time: '15:30', icon: <SunMedium/> },
        { name: 'Maghrib', time: '18:00', icon: <Sunset /> },
        { name: 'Isha', time: '19:30', icon: <Moon/>  },
        { name: 'Tahajjud', time: '03:00', icon: <MoonStar /> }]

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