import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
// do tweet button 
export default class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      friends: [],
    
    };
  }

  getFriends = async () => {
    console.log("GettingFriends of "+ this.props.username);
    const response = await fetch('https://showfriendlist.azurewebsites.net/api/HttpTrigger', {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            'username': this.props.username
        }
    });
    const data = await response.json();
    this.setState({ friends : data })
    console.log(this.state.friends.length)
    const status = await response.status;
    if (status == 200) {
        console.log("Received Friendlist");
        console.log(this.state.friends.length);
    }
  }



  useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },

  }));

  openDialog = () => {
    this.setState({ open: true });
    this.getFriends();
  }
  

  closeDialog = () => {
    this.setState({ open: false });
    };
  render() {
    let classes = this.useStyles;
    return (
       <div>
        <Button variant="outlined" color="primary" onClick={this.openDialog}>
          My Friendlist
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your Friends"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.friends.map(item =>
                <li key={item.id}> {item}
                </li>
                )}
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
  }
}