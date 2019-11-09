import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Timeline from './Timeline';
import UserProfile from './UserProfile'
import './App.css';



export default class Header extends React.Component {

    //create User 
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: "",
            SuggestedFriends: [],
            loggedIn: false,
            timeline: []
        };
    }


    getSuggestedFriends = async () => {
        console.log(this.state.username + " is getting SuggestedFriends")
        const response = await fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger?', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'username': this.state.username
            }
        });
        const data = await response.json();
        this.setState({ SuggestedFriends: data })
        const status = await response.status;
        if (status == 200) {
            console.log("Successfully getting suggested friends")
        }
        else {
            alert(response.statusText)
        }
    }

    getTimeline = async () => {
        console.log("Getting Timeline of " + this.state.username);
        const response = await fetch('https://getalltweets.azurewebsites.net/api/AllTweets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'username': this.state.username
            }
        });
        const data = await response.json();
        console.log(data)
        this.setState({ timeline: data })
        const status = await response.status;
        if (status == 200) {
            console.log("Received Timeline" + " of length " + this.state.timeline.length);
        }
    }

    // createUser
    createUser = async () => {
        console.log("Creating user" + this.state.username )
        const response = await fetch('https://createuserfinal.azurewebsites.net/api/ccreateUserFinal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
            },

            body: JSON.stringify({
                name: this.state.username,
                password: "empty"
            })
        });
        const status = await response.status;
        if (status == 201) {
            console.log("User" + this.state.username + "is created");
            this.setState({ loggedIn: true });
        }
        else {
            alert(response.statusText)
        }
    }

    handleLogin = () => {
        this.setState({ loggedIn: false });
        this.setState({ open: true });
    };

    handleSignUp = () => {
        this.setState({ loggedIn: false });
        this.setState({ open: true });
    }
    closeDialog = () => {
        this.setState({ open: false });
    };

    login = () => {
        if (this.state.username ===""){
            alert('Insert Username')
        }

        this.setState({ open: false });
        this.createUser();
        this.getSuggestedFriends();
        this.getTimeline();
    }

    textInputChanged_username = (event) => {
        this.setState({ username: event.target.value });
    }
    /*
    textInputChanged_password = (event) => {
        this.setState({ password: event.target.value });
    }
    */

    useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    }));

    render() {
        return (
            <div className={this.useStyles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={this.useStyles.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={this.useStyles.title} style={{ flex: 1 }}>
                            Tweetit
            </Typography>
                        <Button color="inherit" onClick={this.handleLogin} > Create User </Button>
                        {/* <Button color="inherit" onClick={this.handleSignUp} >Create User</Button> */}
                        <Dialog open={this.state.open} onClose={this.closeDialog} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Welcome to Tweetit</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Login
          </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="username"
                                    type="text"
                                    fullWidth
                                    onChange={this.textInputChanged_username} value={this.state.username}
                                />
                                {/* 
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="password"
                                    type="password"
                                    fullWidth
                                    onChange={this.textInputChanged_password} value={this.state.password}
                                />
                                */}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closeDialog} color="primary">
                                    Cancel
          </Button>
                                <Button onClick={this.login} color="primary">
                                    Login
          </Button>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
                { (this.state.loggedIn && this.state.username !="") ? <UserProfile username={this.state.username} getTimeline={this.getTimeline} /> : null}
                { (this.state.loggedIn && this.state.username !="") ? < Timeline SuggestedFriends={this.state.SuggestedFriends} username={this.state.username} timeline={this.state.timeline}  getTimeline={this.getTimeline} /> : null}

            </div>);
    }

}