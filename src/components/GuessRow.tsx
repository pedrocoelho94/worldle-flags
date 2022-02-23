import { GuessProps } from '../utils/guessStorage'

type GuessRowProps = {
  guess?: GuessProps
}

const GuessRow = ({ guess }: GuessRowProps) => {
  return (
    <>
      <div className="col-span-2 flex h-8 items-center justify-center border-2">
        {guess && (
          <p className="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-xs 2xs:text-base">
            {`${guess?.name.toUpperCase()} - Distance: ${guess?.distance} KMs`}
          </p>
        )}
      </div>
    </>
  )
}

export default GuessRow
