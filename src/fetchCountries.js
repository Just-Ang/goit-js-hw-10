
function fetchCountries(name) {
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.length >= 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
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
          Notiflix.Notify.failure('Oops, there is no country with that name');
          countriesInfo.innerHTML = '';
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  export { fetchCountries };
  