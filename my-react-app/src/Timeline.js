import React from 'react';
import './App.css';

export default class Timeline extends React.Component {
  //get put where
  getTweet= async()=>{
    const response= await fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'username':'Jared'
      }
    });
    const data = await response.json();
    this.setState({items:data})
    //this.state.items=data
    console.log(this.state.items)
  }
  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = { items: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    this.getTweet();  
  }
  render() {
    console.log(this.state.items);
    return (
      
      <ul>
        {this.state.items.map(item =>
          <li key={item.id}>{item}</li>
        )}
      </ul>
          );
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
            Add #{this.state.items.length + 1}
          </button>
        </form>
        <TodoList items={this.state.items} />
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
      items: state.items.concat(newItem),
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
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


