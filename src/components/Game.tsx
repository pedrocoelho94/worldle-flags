import CountryInput from './CountryInput'
import { DateTime } from 'luxon'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import useCountry from '../hooks/useCountry'
import { countries, sanitize } from '../utils/countries'
import { toast } from 'react-toastify'
import useGuesses from '../hooks/useGuesses'
import Guesses from './Guesses'
import calcDistance from '../utils/calcDistance'
import { loadAllStats, saveStats } from '../utils/statsStorage'
import { loadAllGuesses } from '../utils/guessStorage'

import { BsFlagFill } from 'react-icons/bs'
import ShareButton from './Share'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

const MAX_TRY = 6

const Game = () => {
  const [dayString, setDayString] = useState('')

  // useEffect(() => {
  //   const dayString = getDayString()
  //   //const dayString = '2022-02-26'
  //   setDay(dayString)
  // }, [])

  const day = useMemo(getDayString, [])
  //const dayString = '2022-02-26'
  //const day = '2022-05-17'

  // useMemo(() => {
  //   setDay(day)
  // }, [])

  useEffect(() => {
    setDayString(day)
  }, [dayString])

  //hook para selecionar o país de acordo com o dia
  const [country] = useCountry(dayString)

  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, addGuess] = useGuesses(day)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameStatus, setGameStatus] = useState('' as 'success' | 'failed')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const guessedCountry = countries.find(
      (country) => sanitize(country.name) === sanitize(currentGuess)
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

    if (sanitize(guessedCountry.name) === sanitize(country.name)) {
      toast.success('Correct', { toastId: 'successToast' })
      setGameEnded(true)
      saveStats(dayString, true, 'success')
      setGameStatus('success')
      return
    }

    if (
      guesses.length === MAX_TRY - 1 &&
      guesses[guesses.length - 1].distance > 0
    ) {
      toast.error(`${country.name}`, {
        toastId: 'infoToast',
      })
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
    }
  }, [guesses])

  return (
    <main className="mt-4 flex flex-col items-center p-2 text-white sm:justify-center">
      <div className="mb-4 max-h-48 w-[20rem] max-w-full 2xl:max-h-72">
        <img
          src={country.flag}
          className="mb-4 max-h-48 w-[20rem] max-w-full 2xl:max-h-72"
          alt=""
        />
      </div>

      {gameStatus === 'failed' && (
        <p className="mb-4 text-center">{country.name}</p>
      )}

      {guesses && <Guesses rows={MAX_TRY} guesses={guesses} />}

      {!gameEnded ? (
        <form className="w-[20rem] max-w-full" onSubmit={handleSubmit}>
          <CountryInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            isDisabled={gameEnded}
          />
          <button
            className="mt-2 flex w-full items-center justify-center border-2 p-2 font-bold transition-all hover:border-cyan-600 hover:text-cyan-600"
            type="submit"
          >
            Guess <BsFlagFill className="ml-2" />
          </button>
        </form>
      ) : (
        <ShareButton guesses={guesses} dayString={dayString} />
      )}
    </main>
  )
}

export default Game
