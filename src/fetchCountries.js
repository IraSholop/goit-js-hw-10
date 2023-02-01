import Notiflix from 'notiflix';
export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(data => data.json())
    .then(country => country)
    .catch(console.log);
}
