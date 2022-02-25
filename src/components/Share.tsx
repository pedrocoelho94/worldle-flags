import { DateTime, Interval } from 'luxon'
import { GuessProps } from '../utils/guessStorage'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useState } from 'react'

type ShareProps = {
  guesses: GuessProps[]
  dayString: string
}

const DAY_ONE = DateTime.fromISO('2022-02-23')

const ShareButton = ({ guesses, dayString }: ShareProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = () => {
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 3000)
  }

  const textToShare = () => {
    const win = guesses[guesses.length - 1]?.distance === 0
    const guessCount = win ? guesses.length : 'X'
    const dayCount = Math.floor(
      Interval.fromDateTimes(DAY_ONE, DateTime.fromISO(dayString)).length('day')
    )

    const guessesShare = guesses
      .map((guess) => {
        const distance = guess.distance
        if (distance === 0) {
          return '🟩🟩🟩🟩🟩'
        }
        if (distance <= 2000) {
          return '🟨🟨🟨🟨🟨'
        }
        if (distance > 2000) {
          return '🟥🟥🟥🟥🟥'
        }
      })
      .join('\n')

    const title = `#WorldleFlags #${dayCount} ${guessCount}/6`

    return [title, guessesShare, 'worldleflags.vercel.app'].join('\n\n')
  }

  return (
    <CopyToClipboard
      text={textToShare()}
      onCopy={copy}
      options={{
        format: 'text/plain',
      }}
    >
      <button className="mt-8 flex w-[20rem] max-w-full items-center justify-center  border-2 border-green-700 bg-green-700 p-2  font-bold transition-all hover:border-green-600 hover:bg-green-600">
        {isCopied ? 'COPIED' : 'SHARE YOUR GAME'}
      </button>
    </CopyToClipboard>
  )
}

export default ShareButton
