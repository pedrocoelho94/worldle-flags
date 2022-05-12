import { useMemo } from 'react'
import seedrandom from 'seedrandom'
import { countries, CountryProps } from '../utils/countries'

const useCountry = (dayString: string): [CountryProps] => {
  // const country = useMemo(() => {
  //   // seleciona o país de acordo com o dia
  //   return countries[
  //     Math.floor(seedrandom.alea(dayString)() * countries.length)
  //   ]
  // }, [dayString])

  // return [country]

  // seleciona o país de acordo com o dia
  // const randonNumber = Math.floor(
  //   seedrandom.alea(dayString)() * countries.length
  // )

  const arng = seedrandom.xor128('2022-05-12')
  const myNumber = Math.floor(arng() * countries.length)

  const country = countries[myNumber]

  return [country]
}

export default useCountry
