import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getStats, StatsProps } from '../utils/statsStorage'

export default function Stats() {
  const [stats, setStats] = useState({} as StatsProps)

  useEffect(() => {
    const myStats = getStats()
    setStats(myStats)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center  py-2">
      <Head>
        <title>Worldle Flags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col p-2 text-white">
        <h2>Played: {stats.played}</h2>
        <h2>WinRate: {stats.winRate}%</h2>
        <h2>Wins: {stats.wins}</h2>
        <h2>Loses: {stats.loses}</h2>
        <h2>Current Streak: {stats.currentStreak}</h2>
        <h2>MaxStreak: {stats.maxStreak}</h2>
      </main>
    </div>
  )
}
