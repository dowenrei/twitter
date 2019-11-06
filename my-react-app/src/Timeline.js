import React from 'react';
import './App.css';

export default class Timeline extends React.Component {
  
<<<<<<< HEAD

  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = { tweet: this.props.tweet };
=======
  getTweet= async()=>{
    console.log("getTweet")
    const response= await fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'username':this.props.username
      }
    });
    const data = await response.json();
    this.setState({tweet:data})
    console.log(this.state.tweet)
  }
  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = { tweet: []};
>>>>>>> 0f77977510804dcc447e05cdec111c795ea04a66
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

  }

<<<<<<< HEAD

  render() {
    
    console.log("At timeline render",this.props.tweet)
    if(this.props.tweet==undefined){
      return null
    }
    else{
=======
  componentDidMount(){
    //this.getTweet();  
  }
  render() {
    
    console.log("At timeline render",this.props.username)
>>>>>>> 0f77977510804dcc447e05cdec111c795ea04a66
    //this.getTweet()
    return (
      
      <ul>
<<<<<<< HEAD
        {this.props.tweet.map(item =>
=======
        {this.state.tweet.map(item =>
>>>>>>> 0f77977510804dcc447e05cdec111c795ea04a66
          <li key={item.id}>{item}</li>
        )}
      </ul>
          );
        }
      /*
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}> 
          <label htmlFor="new-todo">
            Tweet
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.tweet.length + 1}
          </button>
        </form>
        <TodoList tweet={this.state.tweet} />
      </div>
      */
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  processResponse(res) {
    console.log(res)
    if (res.status == 201) {
      // do what?
      console.log('hi')
      //this.props.appActions.goToScreen('homepage', { transitionId: 'fadeIn' });
    }
    else{
      alert(res)
    }
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      tweet: state.tweet.concat(newItem),
      text: ''
    }));
    //POST TWEET 
    fetch('https://inserttweet.azurewebsites.net/api/HttpTrigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: "Jared",
        tweet:this.state.text
      })

    })
   .then((res) => this.processResponse(res))
  }
}

class TodoList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.tweet.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


