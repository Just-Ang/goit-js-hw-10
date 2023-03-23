import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');
let inputValue = '';

inputEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));
function searchCountries(e) {
  inputValue = inputEl.value.trim();
  fetchCountries(inputValue)
    .then(data => {
      if (data.length >= 10) {
        countriesList.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2) {
        countriesInfo.innerHTML = '';
        let html = '';
        for (const country of data) {
          const nameOfficial = country.name.official;
          const img = country.flags.svg;
          html += `<li> <img src="${img}" width="40"> ${nameOfficial} </li> `;
          countriesList.innerHTML = html;
        }
      }
      if (data.length === 1) {
        countriesList.innerHTML = '';
        for (const country of data) {
          let html = '';
          const img = country.flags.svg;
          const nameOfficial = country.name.official;
          const capital = country.capital;
          const population = country.population;
          const languages = Object.values(country.languages);
          html += `<h1> <img src="${img}" width="40"> ${nameOfficial} </h1> 
              <p>Capital: ${capital}</p> 
              <p>Population: ${population}</p> 
              <p>Languages: ${languages}</p>`;
          countriesInfo.innerHTML = html;
        }
      }
      if (inputValue === '') {
        countriesList.innerHTML = '';
        countriesInfo.innerHTML = '';
      }
      if (data.status === 404) {
        let error = new Error(data.statusText);
        error.response = data;
        throw error;
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
