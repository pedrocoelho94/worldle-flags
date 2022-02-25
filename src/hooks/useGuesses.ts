import { useCallback, useEffect, useState } from 'react'
import { GuessProps, loadAllGuesses, saveGuesses } from '../utils/guessStorage'

const useGuesses = (
  dayString: string
): [GuessProps[], (newGuess: GuessProps) => void] => {
  const [guesses, setGuesses] = useState<GuessProps[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const guessOfTheDay = loadAllGuesses()[dayString] ?? []
      setGuesses(guessOfTheDay)
    }
  }, [])

  const addGuess = useCallback(
    (newGuess: GuessProps) => {
      const newGuesses = [...guesses, newGuess]

      setGuesses(newGuesses)
      saveGuesses(dayString, newGuesses)
    },
    [dayString, guesses]
  )

  return [guesses, addGuess]
}

export default useGuesses
