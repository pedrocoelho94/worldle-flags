import Head from 'next/head'
import Game from '../components/Game'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center  py-2">
      <Head>
        <title>Worldle Flags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col p-2 text-white">
        <Game />
      </main>
    </div>
  )
}
