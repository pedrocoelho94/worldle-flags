import { GuessProps } from '../utils/guessStorage'

type GuessRowProps = {
  guess?: GuessProps
}

const GuessRow = ({ guess }: GuessRowProps) => {
  if (guess) {
    return (
      <div className="flex h-8 w-[20rem] max-w-full items-center justify-center border-2 border-cyan-600 ">
        {guess && (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-xs 2xs:text-base">
            {`${guess.name.toUpperCase()} - Distance: ${guess.distance} KMs`}
          </p>
        )}
      </div>
    )
  }

  return <div className="h-8 w-[20rem] max-w-full bg-slate-400"></div>
}

export default GuessRow
