const fetch = require("node-fetch");

function processResponse(res){
    if (res.status==201){
      console.log("here")
    }
}

let name ="Jared";
let tweet="Alvins";
//let name = document.getElementById('name').value; 
 
fetch('https://inserttweet.azurewebsites.net/api/HttpTrigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        tweet:tweet
      })

    })
    .then((res) => processResponse(res))