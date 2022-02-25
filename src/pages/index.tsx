import Head from 'next/head'
import Game from '../components/Game'

import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import useCountry from '../hooks/useCountry'

function getDayString() {
  return DateTime.now().toFormat('yyyy-MM-dd')
}

export default function Home() {
  const [day, setDay] = useState('')

  useEffect(() => {
    const dayString = getDayString()
    //const dayString = '2022-02-26'
    setDay(dayString)
  }, [])

  const [country] = useCountry(day)

  return (
    <>
      <Head>
        <title>Worldle Flags</title>
      </Head>
      {console.log('DAY', day)}
      {console.log('COUNTRY', country)}
      <Game country={country} dayString={day} />
    </>
  )
}
