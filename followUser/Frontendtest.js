const fetch = require("node-fetch");

function processResponse(res){
    if (res.status==201){
      console.log("here")
    }
}

let name ="Jared";
let friend="Alvins";
//let name = document.getElementById('name').value; 
 
fetch('https://followuser.azurewebsites.net/api/HttpTrigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        friend:friend
      })

    })
    .then((res) => processResponse(res))