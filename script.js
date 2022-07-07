'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
          <p class="country__row"><span>👫</span>${(
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

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    //render country 1
    renderCountry(data);

    //get neighbour country (2)
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    //AJAX call country country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('usa');
getCountryAndNeighbour('morocco');
// getCountryAndNeighbour('france');
// getCountryAndNeighbour('iraq');
// getCountryAndNeighbour('senegal');


