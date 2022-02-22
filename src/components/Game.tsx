import CountryInput from './CountryInput'
import { DateTime } from 'luxon'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import useCountry from '../hooks/useCountry'
import { countries, sanitizeCountryName } from '../lib/countries'
import { toast } from 'react-toastify'
import { GuessProps, saveGuesses } from '../lib/guessStorage'
import useGuesses from '../hooks/useGuesses'
import Guesses from './Guesses'
import calcDistance from '../lib/calcDistance'
import { loadAllStats, saveStats } from '../lib/statsStorage'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

const MAX_TRY = 6

const Game = () => {
  const dayString = useMemo(getDayString, [])
  //const dayString = '2022-02-03'

  //hook para selecionar o país de acordo com o dia
  const [country] = useCountry(dayString)

  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, addGuess] = useGuesses(dayString)
  const [gameEnded, setGameEnded] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const guessedCountry = countries.find(
      (country) =>
        sanitizeCountryName(country.name) === sanitizeCountryName(currentGuess)
    )

    if (guessedCountry == null) {
      toast.error('Unknown Country')
      return
    }

    const distance = calcDistance(
      country.latitude,
      country.longitude,
      guessedCountry.latitude,
      guessedCountry.longitude,
      'K'
    )

    const newGuess = {
      name: currentGuess,
      distance: Math.round(distance),
    }

    addGuess(newGuess)
    setCurrentGuess('')

    if (guessedCountry.name.toLowerCase() == country.name.toLowerCase()) {
      toast.success('You Got it')
      setGameEnded(true)
      saveStats(dayString, true)
      return
    }
  }

  useEffect(() => {
    const stats = loadAllStats()[dayString]
    setGameEnded(stats?.gameEnded)
  }, [])

  useEffect(() => {
    if (guesses?.length >= MAX_TRY) {
      toast.info(`You failed. The answer was: ${country.name}`, {
        autoClose: 10000,
      })

      setGameEnded(true)
      saveStats(dayString, true)
    }
  }, [guesses])

  return (
    <>
      <h1 className="mb-4 text-center text-[2.5rem] font-bold">
        WOR<span className="text-green-600">L</span>DLE FLAGS
      </h1>

      <div className="mb-4 w-full max-w-md">
        <img src={country.flag} alt="" />
      </div>

      <div className="mb-12 text-center">{country.name}</div>

      <Guesses rows={MAX_TRY} guesses={guesses} />

      <form onSubmit={handleSubmit}>
        <CountryInput
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          isDisabled={gameEnded}
        />

        {!gameEnded && <button type="submit">Guess</button>}
      </form>
    </>
  )
}

export default Game
