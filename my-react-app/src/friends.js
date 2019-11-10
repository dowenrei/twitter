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
            openTweet: false,
            friends: [],
            tweets: []
        };
    }

    getFriends = async () => {
        console.log("GettingFriends of " + this.props.username);
        const response = await fetch('https://tweetit1011.azurewebsites.net/api/getFriend', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'username': this.props.username
            }
        });
        const data = await response.json();
        this.setState({ friends: data })
        const status = await response.status;
        if (status == 200) {
            this.setState({ open: true });
            console.log("Received Friendlist");
        }
    }

    getMyTweet = async () => {
        console.log("Getting Tweets of " + this.props.username);
        const response = await fetch('https://tweetit1011.azurewebsites.net/api/getUserTweets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'username': this.props.username
            }
        });
        const data = await response.json();
        this.setState({ tweets: data })
        const status = await response.status;
        if (status == 200) {
            this.setState({ openTweet: true });
            console.log("Received UserTweet");
        }
    }


    useStyles = makeStyles(theme => ({
        buttonContent: {
            marginTop: theme.spacing(4),
        
        },
    

    }));

    openFriendDialog = () => {
        
        this.getFriends();
    }

    openTweetDialog = () => {
        
        this.getMyTweet();
    }


    closeDialog = () => {
        this.setState({ open: false });
    };

    closeTweetDialog = () => {
        this.setState({ openTweet: false });
    };
    render() {
        let classes = this.useStyles;
        return (
            <div className={classes.buttonContent} >
                <Button variant="outlined" color="primary" onClick={this.openFriendDialog} style={{marginBottom: '20px', marginRight:'20px', marginTop:'20px'}}>
                    My Friendlist 
        </Button>
                <Button variant="outlined" color="primary" onClick={this.openTweetDialog} style={{marginBottom: '20px', marginTop:'20px'}}>
                    My Tweets  
        </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Your Friends"} [{this.state.friends.length}] </DialogTitle>
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
                            ok
            </Button>
                    </DialogActions>
                </Dialog>
                
                <Dialog
                    open={this.state.openTweet}
                    onClose={this.closeTweetDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Your Tweets"} [{this.state.tweets.length}] </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.tweets.map(item =>
                                <li key={item.id}> {item}
                                </li>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeTweetDialog} color="primary" autoFocus>
                            ok
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}