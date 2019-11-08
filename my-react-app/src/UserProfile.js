import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Friends from "./friends"
// do tweet button 
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
      messageSent: false,
    };
  }

  postTweet = async () => {
    console.log(this.props.username + " postTweet");
    fetch('https://inserttweet.azurewebsites.net/api/HttpTrigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: this.props.username,
        tweet: this.state.message
      })
    }).then((res) => {
      console.log(res)
    })
  }



  useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },

  }));

  textInputChanged_message =(event) =>{
    this.setState({message:event.target.value})
  }

  openDialog = () => {
    this.setState({ open: true });
  }
  handleTweet = () => {
    this.setState({open: false}); 
    this.postTweet();
  }

  closeDialog = () => {
    this.setState({ open: false });
    };
  render() {
    let classes = this.useStyles;
    return (
      <div>

        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Welcome {this.props.username}!
      </Typography>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.openDialog}>
          <AddIcon />
        </Fab>
         
          <Dialog open={this.state.open} onClose={this.closeDialog} aria-labelledby="form-dialog-title"  >
            <DialogContent>
              <DialogContentText>
                Write a message
          </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="message"
                type="text"
                fullWidth
                onChange={this.textInputChanged_message} value={this.state.message}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleTweet} color="primary">
                Post
          </Button>
            </DialogActions>
          </Dialog>
          

      </div>
    )
  }
}