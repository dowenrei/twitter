const fetch = require("node-fetch");

function processResponse(res){
    console.log(res[0])
}

fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    })
    .then((res)=> res.json())
    .then((res) => processResponse(res))