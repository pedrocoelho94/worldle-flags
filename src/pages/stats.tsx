import Head from 'next/head'
import { off } from 'process'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getStats, StatsProps } from '../utils/statsStorage'

export default function Stats() {
  const [stats, setStats] = useState({} as StatsProps)
  const [maxDist, setMaxDist] = useState<Number>()

  useEffect(() => {
    const myStats = getStats()
    setStats(myStats)

    // if (stats.guessDistribution) {
    //   const maxDistribution = Math.max(
    //     ...Object.values(stats.guessDistribution)
    //   )
    //   setMax(maxDistribution)
    // }
  }, [])

  useEffect(() => {
    if (stats.guessDistribution) {
      const maxDistribution = Math.max(
        ...Object.values(stats.guessDistribution)
      )
      setMaxDist(maxDistribution)
    }
  }, [stats.guessDistribution])

  return (
    <>
      <Head>
        <title>Worldle Flags - Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex max-w-xl flex-col px-2 text-white mt-4">
        <h2 className="mb-4 text-center text-[1.25rem] font-bold 2xs:text-[1.5rem]">
          Stats
        </h2>

        <div className="mb-8 flex flex-col justify-around 2xs:flex-row">
          <div className="mb-4 flex flex-col items-center">
            <span className="text-[1rem] font-bold 2xs:text-[2rem] sm:text-[3rem]">
              {stats.played}
            </span>
            <h3 className="text-center">Played</h3>
          </div>

          <div className="mb-4 flex flex-col items-center">
            <span className="text-[1rem] font-bold 2xs:text-[2rem] sm:text-[3rem]">
              {stats.winRate}%
            </span>
            <h3 className="text-center">Win Rate</h3>
          </div>

          <div className="mb-4 flex flex-col items-center">
            <span className="text-[1rem] font-bold 2xs:text-[2rem] sm:text-[3rem]">
              {stats.currentStreak}
            </span>
            <h3 className="text-center">Current Streak</h3>
          </div>

          <div className="mb-4 flex flex-col items-center">
            <span className="text-[1rem] font-bold 2xs:text-[2rem] sm:text-[3rem]">
              {stats.maxStreak}
            </span>
            <h3 className="text-center">Max Streak</h3>
          </div>
        </div>

        <h2 className="mb-4 text-center text-[1.25rem] font-bold 2xs:text-[1.5rem]">
          Guess Distribuition
        </h2>

        <div>
          {stats.guessDistribution && (
            <ul>
              {Object.entries(stats.guessDistribution).map(([index, count]) => (
                <li key={index} className="flex py-2">
                  <div className="mr-5 font-bold">{index}</div>

                  <div
                    className="bg-slate-400"
                    style={{
                      flex: `0 1 ${Math.round(
                        (count / Number(maxDist)) * 100
                      )}%`,
                    }}
                  />
                  <div className="bg-slate-400 px-1 font-bold">{count}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  )
}
