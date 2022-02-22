import CountryInput from './CountryInput'
import { DateTime } from 'luxon'
import { useMemo, useRef } from 'react'
import useCountry from '../hooks/useCountry'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

const MAX_TRY = 6

const Game = () => {
  const dayString = useMemo(getDayString, [])

  // const countryInputRef = useRef<HTMLInputElement>(null)

  const [country] = useCountry('2022-02-19')

  return (
    <>
      <h1 className="font-bold">
        WOR<span className="text-green-600">L</span>DLE FLAGS
      </h1>
      {country.name}
      <img src={country.flag} alt="" />
      <CountryInput />
    </>
  )
}

export default Game
