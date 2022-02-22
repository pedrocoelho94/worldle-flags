import { GuessProps } from '../lib/guessStorage'

type GuessRowProps = {
  guess?: GuessProps
}

const GuessRow = ({ guess }: GuessRowProps) => {
  return (
    <>
      <div className="col-span-2 flex h-8 items-center justify-center border-2">
        {guess && (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {`${guess?.name.toUpperCase()} - Distance: ${guess?.distance} KMs`}
          </p>
        )}
      </div>
    </>
  )
}

export default GuessRow
