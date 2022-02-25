import Head from 'next/head'
import Game from '../components/Game'

import { DateTime } from 'luxon'
import { useMemo } from 'react'
import useCountry from '../hooks/useCountry'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

export default function Home() {
  const dayString = getDayString()
  //const dayString = '2022-02-26'

  const [country] = useCountry(dayString)

  return (
    <>
      <Head>
        <title>Worldle Flags</title>
      </Head>

      <Game country={country} dayString={dayString} />
    </>
  )
}
