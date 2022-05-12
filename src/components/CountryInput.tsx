import Autosuggest from 'react-autosuggest'
import { useState } from 'react'
import { countries, getCountryName, sanitize } from '../utils/countries'

type CountryInputProps = {
  currentGuess: string
  setCurrentGuess: (guess: string) => void
  isDisabled: boolean
}

const CountryInput = ({
  currentGuess,
  setCurrentGuess,
  isDisabled,
}: CountryInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(
          countries
            .map((c) => getCountryName(c).toUpperCase())
            .filter((countryName) =>
              sanitize(countryName).includes(sanitize(value))
            )
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => (
        <div className="er-1 flex h-full cursor-pointer items-center overflow-hidden text-ellipsis border-x-2 border-y-[1px] p-2 transition-all hover:bg-slate-300 hover:text-gray-800">
          {suggestion}
        </div>
      )}
      inputProps={{
        disabled: isDisabled,
        className: 'w-full text-gray-900 h-10 mt-4 text-xs 2xs:text-base p-2',
        placeholder: isDisabled
          ? 'Come back tomorrow for more guesses'
          : 'Country',
        value: currentGuess,
        onChange: (_e, { newValue }) => setCurrentGuess(newValue),
      }}
      containerProps={{
        className: 'relative',
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={`${containerProps.className} absolute bottom-full mb-1 max-h-64 w-full divide-x-2 overflow-auto bg-gray-700`}
        >
          {children}
        </div>
      )}
    />
  )
}

export default CountryInput
