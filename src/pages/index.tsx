import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CountryInput from '../components/CountryInput'
import Game from '../components/Game'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900 py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col text-white">
        <Game />
      </main>
    </div>
  )
}

export default Home
