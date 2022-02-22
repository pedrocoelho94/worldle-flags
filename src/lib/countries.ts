export type CountryProps = {
  code: string
  latitude: number
  longitude: number
  name: string
  flag: string
}

export const countries: CountryProps[] = [
  {
    code: 'AD',
    latitude: 42.546245,
    longitude: 1.601554,
    name: 'Andorra',
    flag: 'https://countryflagsapi.com/svg/020',
  },
  {
    code: 'AE',
    latitude: 23.424076,
    longitude: 53.847818,
    name: 'United Arab Emirates',
    flag: 'https://countryflagsapi.com/svg/784',
  },
  {
    code: 'AF',
    latitude: 33.93911,
    longitude: 67.709953,
    name: 'Afghanistan',
    flag: 'https://countryflagsapi.com/svg/004',
  },
  {
    code: 'AG',
    latitude: 17.060816,
    longitude: -61.796428,
    name: 'Antigua and Barbuda',
    flag: 'https://countryflagsapi.com/svg/028',
  },
  {
    code: 'AI',
    latitude: 18.220554,
    longitude: -63.068615,
    name: 'Anguilla',
    flag: 'https://countryflagsapi.com/svg/660',
  },
  {
    code: 'AL',
    latitude: 41.153332,
    longitude: 20.168331,
    name: 'Albania',
    flag: 'https://countryflagsapi.com/svg/008',
  },
  {
    code: 'AM',
    latitude: 40.069099,
    longitude: 45.038189,
    name: 'Armenia',
    flag: 'https://countryflagsapi.com/svg/051',
  },
]

export function sanitizeCountryName(countryName: string): string {
  return countryName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[- '()]/g, '')
    .toLowerCase()
}

export function getCountryName(country: CountryProps) {
  return country.name
}
