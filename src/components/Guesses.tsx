import { GuessProps } from '../lib/guessStorage'
import GuessRow from './GuessRow'

type GuessesProps = {
  rows: number
  guesses: GuessProps[]
}

const Guesses = ({ rows, guesses }: GuessesProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-1 text-center">
        {Array.from(Array(rows).keys()).map((index) => (
          <>
            <GuessRow key={index} guess={guesses[index]} />
          </>
        ))}
      </div>
    </div>
  )
}

export default Guesses
