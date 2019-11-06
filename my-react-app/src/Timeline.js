import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default class Timeline extends React.Component {


  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = { tweet: this.props.tweet };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

  }

  useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(10),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));

  render() {
    let classes=this.useStyles;
    console.log("At timeline render", this.props.tweet)
    if (this.props.tweet == undefined) {
      return null
    }
    else {
      //this.getTweet()
      return (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
            <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Your Timeline
            </Typography>
                <ul>
                  {this.props.tweet.map(item =>
                    <li key={item.id}>{item}</li>
                  )}
                </ul>
              </Paper>


            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Suggested Friends
                </Typography>
                </Paper>
            </Grid>

          </Grid>
        </div>


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
    else {
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
        tweet: this.state.text
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


