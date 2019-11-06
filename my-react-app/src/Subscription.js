export const getSuggestedFriends= async(username)=>{
   //username checked
   var data=[]; 
   console.log("getTweet")
    console.log(username)
    fetch('https://getusertweets.azurewebsites.net/api/getUserTweets', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'username':username
      }
    })
    .then((res)=> res.json())
    .then((res)=> data = res)
    console.log(data)
    return data;

  } 