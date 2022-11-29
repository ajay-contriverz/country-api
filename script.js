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

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then( response => response.json())
//     .then( data => {
//         renderCountry(data[1]);
//         const neighbour =  data[1].borders[0];
//         if( !neighbour ) return;
//         return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//     })
//     .then( response => response.json() )
//     .then( data => renderCountry(data, 'neighbour') )
// }

// getCountryData("india")

// console.log(5)
// const test = async () => {
//     console.log(1)
//     await console.log(2)
//     console.log(3)
//     console.log(4)
// }

// test()
// console.log(6)

// navigator.geolocation.getCurrentPosition(pos => console.log(pos), err => console.log(err))

const getJSON = function(url){
    const res = fetch(url);
    return res.json();
}


const countryData = async function(country1, country2, country3){
    try{
        const data1 = await getJSON(`https://restcountries.com/v2/name/${country1}`);
        const data2 = await getJSON(`https://restcountries.com/v2/name/${country2}`);
        const data3 = await getJSON(`https://restcountries.com/v2/name/${country3}`);
        const data = [(data1[country1 === "india" ? 1 : 0]), (data2[country2 === "india" ? 1 : 0]), (data3[country3 === "india" ? 1 : 0])];
        data.forEach(function(dt){
            renderCountry(dt)
        })
    } catch(err) {
        console.error(err)
    }
}

countryData("china", "india", "australia")