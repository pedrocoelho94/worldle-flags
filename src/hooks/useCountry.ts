import { useMemo } from 'react'
import seedrandom from 'seedrandom'
import { countries, CountryProps } from '../lib/countries'

const useCountry = (dayString: string): [CountryProps] => {
  const country = useMemo(() => {
    // seleciona o país de acordo com o dia
    return countries[
      Math.floor(seedrandom.alea(dayString)() * countries.length)
    ]
  }, [dayString])

  return [country]
}

export default useCountry
