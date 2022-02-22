import Autosuggest from 'react-autosuggest'
import { useState } from 'react'
import {
  countries,
  getCountryName,
  sanitizeCountryName,
} from '../lib/countries'

const CountryInput = ({}) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')

  return (
    <>
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
          <div className="border-2 dark:bg-slate-800 dark:text-slate-800">
            {suggestion}
          </div>
        )}
        inputProps={{
          className: 'w-full text-gray-900',
          placeholder: 'Type a country',
          value: currentGuess,
          onChange: (_e, { newValue }) => setCurrentGuess(newValue),
        }}
      />
      {currentGuess}
    </>
  )
}

export default CountryInput
