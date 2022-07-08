'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const form = document.querySelector('.form');
///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `
<article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👥</span>${(
            +data.population / 1000000
          ).toFixed(1)} M people</p>
          <p class="country__row"><span>🗣️</span>${languages[0]}</p>
          <p class="country__row"><span>💰</span>${currencies[0].name} / ${
    currencies[0].symbol
  }</p>
        </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
  btn.style.display = 'none';
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryAndNeighbour = function (country) {
  //AJAX call country 1

  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(([data]) => {
      renderCountry(data);
      const neighbour = data?.borders[0];
      if (!neighbour) throw new Error('No neighbour country !');
      //AJAX call country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(([data]) => renderCountry(data, 'neighbour'))
    .catch(err => renderError(`ERROR ${err.message} 😀 `));
};

form.addEventListener('submit', e => {
  e.preventDefault();
  countriesContainer.innerHTML='';
  getCountryAndNeighbour(btn.value);
  btn.value = '';
});

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('senegal');
// getCountryAndNeighbour('france');
// getCountryAndNeighbour('iraq');
// getCountryAndNeighbour('senegal');
