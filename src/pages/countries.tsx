import Head from 'next/head'
import AllCountries from '../components/AllCountries'
import Game from '../components/Game'

export default function Home() {
  return (
    <>
      <Head>
        <title>Worldle Flags</title>
      </Head>

      <AllCountries />
    </>
  )
}
