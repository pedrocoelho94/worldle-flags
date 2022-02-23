import CountryInput from './CountryInput'
import { DateTime } from 'luxon'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import useCountry from '../hooks/useCountry'
import { countries, sanitizeCountryName } from '../utils/countries'
import { toast } from 'react-toastify'
import useGuesses from '../hooks/useGuesses'
import Guesses from './Guesses'
import calcDistance from '../utils/calcDistance'
import { loadAllStats, saveStats } from '../utils/statsStorage'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

const MAX_TRY = 6

const Game = () => {
  const dayString = useMemo(getDayString, [])
  //const dayString = '2022-02-03'

  const countryInputRef = useRef<HTMLInputElement>(null)

  //hook para selecionar o país de acordo com o dia
  const [country] = useCountry(dayString)

  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, addGuess] = useGuesses(dayString)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameStatus, setGameStatus] = useState('')

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
      saveStats(dayString, true, 'success')
      return
    }
  }

  useEffect(() => {
    const stats = loadAllStats()[dayString]
    setGameEnded(stats?.gameEnded)
    setGameStatus(stats?.status)
  }, [])

  useEffect(() => {
    if (guesses?.length >= MAX_TRY) {
      toast.info(`You failed. The answer was: ${country.name}`, {
        autoClose: 10000,
      })

      setGameEnded(true)
      saveStats(dayString, true, 'failed')
    }
  }, [guesses])

  return (
    <>
      <h1 className="mb-4 text-center text-[1.5rem] font-bold">
        WOR<span className="text-green-600">L</span>DLE FLAGS
      </h1>

      <div className="mx-auto mb-4 flex w-full max-w-sm">
        <img src={country.flag} alt="" />
      </div>

      {gameStatus !== 'success' && (
        <p className="mb-4 text-center">{country.name}</p>
      )}

      {gameStatus === 'success' && (
        <p className="mb-4 text-center">{`You got it. The answer was ${country.name}.`}</p>
      )}

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
