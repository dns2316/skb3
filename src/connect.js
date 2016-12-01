import fetch from 'node-fetch';

// const dataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/data.json';
const dataUrl = 'https://raw.githubusercontent.com/dns2316/skb3/3b/data.json';

let data = {};

fetch(dataUrl)
    .then((res) => {
        console.log('fetch start!');
        data = res.json();
        data.pets = data.pets.sort((a,b) => a.id - b.id);
    })
    .catch(err => {
        console.log('Error in connect json: ', err);
    });
console.log(data);