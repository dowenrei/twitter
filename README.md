# twitter
  fetch('<YOUR FUNCTION URL GOES HERE>', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then((res) => processResponse(res))
}