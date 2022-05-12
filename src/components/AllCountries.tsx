import { countries } from '../utils/countries'

const AllCountries = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {countries.map((country) => (
        <div className="mt-4 text-white sm:justify-center">
          {/* <div>{country.name}</div> */}
          <img src={country.flag} alt="" />
        </div>
      ))}
    </div>
  )
}

export default AllCountries
