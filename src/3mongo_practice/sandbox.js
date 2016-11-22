export default function sandbox(indexConst) {
  const findIndex = indexConst - 5;
  console.log('findIndex in sandbox: ', findIndex);
  const findPlace = `{
    "user": {
      "name": "dns2316",
    },
    "balls": [
      {
        "name": "GearyPost",
        "type": "football",
      },
      {
        "name": "LuisPost",
        "type": "basketball",
      },
      {
        "name": "PollPost",
        "type": "volleyball",
      },
    ],
  }`;

  let answer = '';
  let i = findIndex;
  while (i < findIndex + 10) {
    answer += findPlace.charAt(findIndex);
    i ++
  }
  // console.log('Responce sandbox: \nlook - ', answer);
  console.log('Responce sandbox: \n=== ', findPlace[41,42,43], '\n===');
  console.log('length findIndex in sandbox: \nlook - ', findPlace.length);
}

/*
to JSON for test on POST Advanced rest client

{
  "user": {
    "name": "dns2316"
  },
  "balls": [
    {
      "name": "GearyPost",
      "type": "football"
    },
    {
      "name": "LuisPost",
      "type": "basketball"
    },
    {
      "name": "PollPost",
      "type": "volleyball"
    }
  ]
}
*/
