'use strict';

// const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const request = new XMLHttpRequest();

// request.open('GET', 'https://restcountries.com/v2/all');
// request.send();

// request.addEventListener("load", function(){
//     countriesContainer.style.opacity = 1;
//     const datas = JSON.parse(this.responseText);
//     datas.map(data => {
//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flags.svg}" />
//             <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>POP ${(+data.population / 1000000).toFixed(1)} M people</p>
//             <p class="country__row"><span>🗣️</span>LANG ${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>CUR ${data.currencies ? data.currencies[0].name : "NA"}</p>
//             </div>
//         </article>
//         `;
//         countriesContainer.insertAdjacentHTML("beforeend", html)
//     });
// })

const renderCountry = function(data, padosi){
    countriesContainer.style.opacity = 1;
    const html = `
    <article class="country ${padosi}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>POP ${(+data.population / 1000000).toFixed(1)} M people</p>
        <p class="country__row"><span>🗣️</span>LANG ${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>CUR ${data.currencies ? data.currencies[0].name : "NA"}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html)
}

const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then( response => response.json())
    .then( data => {
        renderCountry(data[1]);
        const neighbour =  data[1].borders[0];
        if( !neighbour ) return;
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    })
    .then( response => response.json() )
    .then( data => renderCountry(data, 'neighbour') )
}

getCountryData("india")