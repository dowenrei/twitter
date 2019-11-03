const fetch = require("node-fetch");

function processResponse(res){
    console.log(res[0])
}
let username ='Jared';
fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'username':username
      }
    })
    .then((res)=> res.json())
    .then((res) => processResponse(res))