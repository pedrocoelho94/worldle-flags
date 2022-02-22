import { useCallback, useEffect, useState } from 'react'
import { GuessProps, loadAllGuesses, saveGuesses } from '../lib/guessStorage'

const useGuesses = (
  dayString: string
): [GuessProps[], (newGuess: GuessProps) => void] => {
  const [guesses, setGuesses] = useState<GuessProps[]>([])

  //() => initial()
  // function initial() {
  //   if (typeof window !== 'undefined') {
  //     return loadAllGuesses()[dayString] ?? []
  //   }

  //   return []
  // }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const guessOfTheDay = loadAllGuesses()[dayString] ?? []
      setGuesses(guessOfTheDay)
    }
  }, [dayString])

  const addGuess = (newGuess: GuessProps): void => {
    const newGuesses = [...guesses, newGuess]

    setGuesses(newGuesses)
    saveGuesses(dayString, newGuesses)
  }

  return [guesses, addGuess]
}

export default useGuesses
