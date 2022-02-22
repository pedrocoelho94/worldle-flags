import Autosuggest from 'react-autosuggest'
import { useState } from 'react'
import {
  countries,
  getCountryName,
  sanitizeCountryName,
} from '../lib/countries'

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
              sanitizeCountryName(countryName).includes(
                sanitizeCountryName(value)
              )
            )
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => (
        <div className="flex h-8 cursor-pointer items-center border-2  transition-all hover:bg-slate-300 hover:text-gray-800">
          {suggestion}
        </div>
      )}
      inputProps={{
        disabled: isDisabled,
        className: 'w-full text-gray-900 h-10 mt-5 text-xl p-2',
        placeholder: isDisabled
          ? 'Come back tomorrow for more guesses'
          : 'Type a country',
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
