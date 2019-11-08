import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';


export default class Timeline extends React.Component {


  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = {
      buttonText : "Follow"
    }
  }
  
    // followUser
    follow = async (friend) => {
      console.log(this.props.username + " wants to follow " + friend)
      const response = await fetch('https://followuser.azurewebsites.net/api/HttpTrigger', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type': 'application/json',
          },
          
          body: JSON.stringify({
            name: this.props.username,
            friend:friend
          })
      });
      const status = await response.status;
      if (status == 201) {
          //this.setState({buttonText:"Followed"});
          console.log("Followed Friends");
      }
      else{
        alert(response.statusText)
      }
  }


  handleFollow(friend,index){
    console.log(friend,index)
    this.follow(friend)
  }
  useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(10),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    }
  }));

  render() {
    let classes=this.useStyles;
    //console.log("At timeline render", this.props.SuggestedFriends)
    if (this.props.SuggestedFriends == undefined && this.props.timeline == undefined) {
      return null
    }
    else {
      console.log(this.props.timeline)
      var numberOfFriends=this.props.SuggestedFriends.length;
      return (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
            <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Your Timeline
            </Typography>
            <Typography component="h2" variant="body1" color="textPrimary">
                  
                  {this.props.timeline.map(item =>
                    <li key={item.id}> {item.Username} says {item.Tweet}
                      
                    </li>
                  )}
                  </Typography>
              </Paper>


            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Suggested Friends ({this.props.SuggestedFriends.length})
                </Typography>
                <ul>
                <Typography component="h2" variant="body1" color="textPrimary">
                  {this.props.SuggestedFriends.map((item,index) =>
                    <li key={index}> {item} {item.id}
                          <Button variant="outlined" disabled={false} className={classes.button} onClick={() => this.handleFollow(item,index)} >
        {this.state.buttonText}
      </Button>
                    </li>
                  )}
                  </Typography>
                </ul>
                </Paper>
            </Grid>

          </Grid>
        </div>


      );
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  processResponse(res) {
    console.log(res)
    if (res.status == 201) {
      console.log('hi')
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
      SuggestedFriends: state.SuggestedFriends.concat(newItem),
      text: ''
    }));
    //POST SuggestedFriends 
    fetch('https://insertSuggestedFriends.azurewebsites.net/api/HttpTrigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: "Jared",
        SuggestedFriends: this.state.text
      })

    })
      .then((res) => this.processResponse(res))
  }
}

class TodoList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.SuggestedFriends.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


