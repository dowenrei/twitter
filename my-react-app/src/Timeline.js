import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class Timeline extends React.Component {


  constructor(props) {
    console.log('Timeline Constructor ')
    super(props);
    this.state = {
      buttonText:'Follow',
      open:false,
      friend:''
    }
  }
  
    // followUser
    follow = async (friend) => {
      console.log(this.props.username + " wants to follow " + friend)
      const response = await fetch('https://tweetit1011.azurewebsites.net/api/followUser', {
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
          this.openDialog();
          this.setState({friend:friend});
          console.log("Followed Friends");
          this.props.getTimeline();
      }
      else{
        alert(response.statusText)
      }
  }

  openDialog = () => {
    this.setState({ open: true });
  }

  closeDialog = () => {
    this.setState({ open: false });
  };
  
  handleFollow(friend,index){
  //  console.log(friend,index)
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
      //console.log(this.props.timeline)
      var numberOfFriends=this.props.SuggestedFriends.length;
      return (
        <div className={classes.root}>
          <Grid container spacing={1} style={{paddingLeft:'10px'}} >
            <Grid item xs={6}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Your Timeline
            </Typography>
            <Typography component="h2" variant="body1" color="textPrimary">
                  
                  {this.props.timeline.map(item =>
                    <li key={item.id}> {item.Username} :" {item.Tweet} ".
                      
                    </li>
                  )}
                  </Typography>



            </Grid>
            <Grid item xs={6} style={{width:'300px'}}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom style={{width:'300px'}}>
                Suggested Friends ({this.props.SuggestedFriends.length})
                </Typography>
                <ul>
                <Typography component="h2" variant="body1" color="textPrimary" style={{width:'200px'}}>
                  {this.props.SuggestedFriends.map((item,index) =>
                    <li key={index} style={{width:'300px'}} > {item} {item.id}
                          <Button variant="outlined" disabled={false} className={classes.button} onClick={() => this.handleFollow(item,index)} >
        {this.state.buttonText}
      </Button>
                    </li>
                  )}
                  </Typography>
                </ul>
            </Grid>

          </Grid>
          <Dialog
                    open={this.state.open}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {this.props.username} successfully follows {this.state.friend}.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
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

}



