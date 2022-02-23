export type StatsProps = {
  wins: number
  loses: number
}

export const loadAllStats = () => {
  const storedStats = localStorage.getItem('stats')

  return storedStats === null ? {} : JSON.parse(storedStats)
}

export const saveStats = (
  dayString: string,
  gameEnded: boolean,
  status: 'success' | 'failed'
) => {
  const allStats = loadAllStats()

  localStorage.setItem(
    'stats',
    JSON.stringify({
      ...allStats,
      [dayString]: {
        gameEnded,
        status,
      },
    })
  )
}
