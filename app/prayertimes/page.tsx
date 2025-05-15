import { getPrayerTimes } from "./PrayerTimePage";





export default async function PrayerTimePage() {

  const prayerTimes = await getPrayerTimes()
  console.log('prayerTimes', prayerTimes)

  function formatTime(t) {
    if (t.hours == null || t.minutes == null || t.seconds == null) return null
    return `${t.hours.toString().padStart(2, '0')}:${t.minutes.toString().padStart(2, '0')}:${t.seconds.toString().padStart(2, '0')}`
  }


  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">{/*MOSQUE NAME */}</h1>
      <div className="flex flex-wrap gap-4 align-center justify-center h-fit">
        {prayerTimes.map((prayer) => (
          <div key={prayer.name} className="border rounded-md p-4 min-w-32 flex flex-col gap-1">
            <div className="flex flex-col justify-between items-center">
              <div> {prayer.icon}</div>
              <h2 className="font-bold break-words">{prayer.name}</h2>
            </div>
            <div className="text-center justify-center">
              <span className="text-xl font-bold">
                {prayer.time.getHours().toString().padStart(2, '0')}:
                {prayer.time.getMinutes().toString().padStart(2, '0')}
              </span>
              <div className="text-xs text-gray-400">
                <div className="text-xs text-gray-400">
                  {prayer.timeRemaining.hours != null &&
                    `${prayer.timeRemaining.hours.toString().padStart(2, '0')}:`}
                  {prayer.timeRemaining.minutes != null &&
                    `${prayer.timeRemaining.minutes.toString().padStart(2, '0')}:`}
                  {prayer.timeRemaining.seconds != null &&
                    `${prayer.timeRemaining.seconds.toString().padStart(2, '0')}`}
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}