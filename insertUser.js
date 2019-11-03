function processResponse(res){
    if (res.status==201){
      console.log("here")
    } 
  }

 username ="Jared";
 password="Alvins";
//let name = document.getElementById('name').value; 
 
fetch('https://twitteruser.azurewebsites.net/api/createTweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
        
      },
      body: JSON.stringify({
        username: username,
        password: password
      })

    })
    .then((res) => processResponse(res))