const fetch = require("node-fetch");

function processResponse(res){
    console.log(res[0])
}

fetch('https://getusertweets.azurewebsites.net/api/getUserTweets', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'username':'Jared'
      }
    })
    .then((res)=> res.json())
    .then((res) => processResponse(res))


    
        
    
    