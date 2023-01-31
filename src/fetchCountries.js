import Notiflix from 'notiflix';
export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(data => data.json())
    .then(country => {
      if (country.status === 404) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return country;
    }).catch(console.log);
}
