import fetch from 'node-fetch';
// import fetch from 'isomorphic-fetch';

// const dataUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/data.json';
const dataUrl = 'https://raw.githubusercontent.com/dns2316/skb3/3b/data.json';

let data = {};
console.log('Fetching JSON');
fetch(dataUrl)
    .then(async (res) => {
        data = await res.json();
        // console.log(data);
        data.pets = data.pets.sort((a,b) => a.id - b.id);
        return data;
    })
    .catch(err => {
        console.log('Error in gets uPi: ', err);
    });