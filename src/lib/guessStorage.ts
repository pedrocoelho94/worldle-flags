export type GuessProps = {
  name: string
  distance: number
}

export const loadAllGuesses = (): Record<string, GuessProps[]> => {
  const storedGuesses = localStorage.getItem('guesses')

  return storedGuesses === null ? {} : JSON.parse(storedGuesses)
}

export const saveGuesses = (dayString: string, guesses: GuessProps[]) => {
  const allGuesses = loadAllGuesses()

  localStorage.setItem(
    'guesses',
    JSON.stringify({
      ...allGuesses,
      [dayString]: guesses,
    })
  )
}
