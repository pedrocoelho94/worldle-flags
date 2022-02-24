import { loadAllGuesses } from './guessStorage'

export type StatsProps = {
  currentStreak: number
  maxStreak: number
  played: number
  winRate: number
  wins: number
  loses: number
  guessDistribution: Record<number | string, number>
}

export const getStats = (): StatsProps => {
  const allGuesses = loadAllGuesses()

  //transforma em array
  const allGuessesEntries = Object.entries(allGuesses)
  const played = allGuessesEntries.length

  const guessDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    X: 0,
  }

  let wins = 0
  let loses = 0
  let currentStreak = 0
  let maxStreak = 0

  for (const [_day, guesses] of allGuessesEntries) {
    const winIndex = guesses.findIndex((guess) => guess.distance === 0)

    if (winIndex >= 0) {
      wins++
      const tries = (winIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6
      guessDistribution[tries]++
      currentStreak++
    } else {
      currentStreak = 0
      guessDistribution['X']++
    }

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak
    }
  }

  loses = played - wins

  return {
    played,
    winRate: Math.round((wins / played) * 100) || 0,
    wins,
    loses,
    guessDistribution,
    currentStreak,
    maxStreak,
  }
}

export const loadAllStats = () => {
  const storedStats = localStorage.getItem('stats')

  return storedStats === null ? {} : JSON.parse(storedStats)
}

export const saveStats = (
  dayString: string,
  gameEnded: boolean,
  status: 'success' | 'failed' | 'running'
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
