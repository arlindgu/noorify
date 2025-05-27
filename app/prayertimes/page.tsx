import { getMosqueConfig, getPrayerTimes } from "./PrayerTimePage";
import Countdown from "./Countdown";

export default async function PrayerTimePage() {

  const data = await getMosqueConfig()

  const prayerTimes = await getPrayerTimes()

  return (
    <main className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">{data?.[0]?.name ?? "Unbekannte Moschee"}</h1>
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
                <Countdown targetTime={prayer.time.getTime()} />
              </div>
            </div>

          </div>

        ))}

    </div>
    </main >
  );
}