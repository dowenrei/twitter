import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Friends from "./friends"
import { Container } from '@material-ui/core';
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
    console.log(this.props.username + " is posting Tweet..");
    const response= await fetch('https://tweetit1011.azurewebsites.net/api/insertTweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: this.props.username,
        tweet: this.state.message
      })
    });
    const status = await response.status;
    if(status ==201){
      console.log(this.props.username + " : ' "+ this.state.message + ".' ");
      this.props.getTimeline();
    }
    else{
      alert(response.statusText)
    }
    }



  useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
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

        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" style={{marginTop: '20px'}}>
          Welcome {this.props.username}, Start Tweeting now!
      </Typography>
        <Container maxWidth="sm" align="center">
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.openDialog}  style={{marginBottom: '20px'}}>
          <AddIcon /> 
        </Fab>
        <Friends username={this.props.username} />
        </Container>
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