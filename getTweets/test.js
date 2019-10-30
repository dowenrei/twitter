const fetch = require("node-fetch");


a=[
    {
        "a":"b"
    },
    {
        "c  ":"d"
    }
];
console.log(a[0]["a"])

function processResponse(res){
    console.log(res.body)
}

fetch('https://getusertweets.azurewebsites.net/api/getUserTweets', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      }
    })
    .then((res) => processResponse(res))

    
        
    
    