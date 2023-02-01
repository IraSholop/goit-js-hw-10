import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('keyup', debounce(onSearch, DEBOUNCE_DELAY));
let userInterface = '';

function onSearch() {
  const value = input.value.trim();
  if (!value) {
    clear();
    return;
  }
  fetchCountries(value)
    .then(country => {
      if (country.status === 404) {
        clear();
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      } else {
        return country;
      }
    })
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clear();
      } else if (country.length < 10 && country.length > 2) {
        for (let i = 0; i < country.length; i++) {
          clear();
          countryListForUser(country[i]);
        }
        userInterface = '';
      } else {
        clear();
        countryInfoForUser(country[0]);
      }
    })
    .catch(console.log);
}

function countryListForUser(item) {
  userInterface += `<li><img src=${item.flags.svg}><p>${item.name.common}</p></li>`;
  countryList.innerHTML = userInterface;
}

function countryInfoForUser(card) {
  countryInfo.innerHTML = `<div><img src=${card.flags.svg}>
    <h2>${card.name.common}</h2></div>
    <p><b>Capital: </b>${card.capital}</p>
    <p><b>Population: </b>${card.population}</p>
    <p><b>Languages: </b>${Object.values(card.languages)}</p>`;
}

function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
