import CountryInput from './CountryInput'
import { DateTime } from 'luxon'
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import useCountry from '../hooks/useCountry'
import { countries, sanitizeCountryName } from '../utils/countries'
import { toast } from 'react-toastify'
import useGuesses from '../hooks/useGuesses'
import Guesses from './Guesses'
import calcDistance from '../utils/calcDistance'
import { getStats, loadAllStats, saveStats } from '../utils/statsStorage'
import { loadAllGuesses } from '../utils/guessStorage'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

const MAX_TRY = 1

const Game = () => {
  //const dayString = useMemo(getDayString, [])
  const dayString = '2022-10-24'
  //const countryInputRef = useRef<HTMLInputElement>(null)

  //hook para selecionar o país de acordo com o dia
  const [country] = useCountry(dayString)

  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, addGuess] = useGuesses(dayString)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameStatus, setGameStatus] = useState('' as 'success' | 'failed')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const guessedCountry = countries.find(
      (country) =>
        sanitizeCountryName(country.name) === sanitizeCountryName(currentGuess)
    )

    if (guessedCountry == null) {
      toast.warning('Unknown Country', { toastId: 'warningToast' })
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

    if (guessedCountry.name.toLowerCase() === country.name.toLowerCase()) {
      toast.success('You Got it', { toastId: 'successToast' })
      setGameEnded(true)
      saveStats(dayString, true, 'success')
      setGameStatus('success')
      return
    }
  }

  useEffect(() => {
    const guessOf = loadAllGuesses()[dayString]
    const stats = loadAllStats()[dayString]
    setGameEnded(stats?.gameEnded || false)
    setGameStatus(stats?.status)

    if (
      guessOf?.length >= MAX_TRY &&
      guessOf[guessOf.length - 1].distance > 0
    ) {
      setGameEnded(true)
      saveStats(dayString, true, 'failed')

      toast.error(`You failed. The answer was: ${country.name}`, {
        toastId: 'infoToast',
      })
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
