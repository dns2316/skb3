import express from 'express';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import canonize from './canonize';

const __DEV__ = true;
const app = express();
app.get('/canonize', (req, res) => {
  const username = canonize(req.query.url);
  res.json({
    url: req.query.url,
    username,
  });
});

const baseUrl = 'http://pokeapi.co/api/v2';
const pokemonFields = ['id', 'name', 'base_experience', 'height', 'is_default', 'order', 'weight'];

async function getPokemons(url, i = 0) {
  console.log('getPokemons ', url, i);
  const response = await fetch(url);
  // console.log(response);
  const page = await response.json();
  const pokemons = page.results;
  if (__DEV__ && i > 1) {
    return pokemons;
  }
  if (page.next){
    const pokemons2 = await getPokemons(page.next, i + 1);
    return [
      ...pokemons,
      ...pokemons2
    ]
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log('getPokemon ', url);
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon
}

app.get('/', async (req, res) => {
  try {
    const pokemonsUrl = `${baseUrl}/pokemon`;
    const pokemonsInfo = await getPokemons(pokemonsUrl);
    // const pokemonsPromises = pokemonsInfo.slice(0, 2).map(info => {
    const pokemonsPromises = pokemonsInfo.map(info => {
      return getPokemon(info.url)
    });
    const pokemonsFull = await Promise.all(pokemonsPromises);
    const pokemons = pokemonsFull.map((pokemon) => {
      return _.pick(pokemon, pokemonFields);
    });
    const sortPokemons = _.sortBy(pokemons, pokemon => -pokemon.weight);
    return res.json(sortPokemons);
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
});

app.listen(28713, () => {
  console.log('serv is work!');
})

// fetch('/article/fetch/user.json')
//   .then(function(response) {
//     alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
//     alert(response.status); // 200
//
//     return response.json();
//    })
//   .then(function(user) {
//     alert(user.name); // iliakan
//   })
//   .catch( alert );
// зачем он копировал этот код фетча?

// array.forEach((url) => {
//   const username = canonize(url);
//   console.log(username[5]);
// })

// Не понятно, зачем он так делает, ведь можно просто сделать
// поиск текста по ссылке (string) и вывести эту ссылку.
