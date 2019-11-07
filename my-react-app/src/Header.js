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
    // tweet : AllTweets
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: "",
            password: "",
            tweet: [],
            loggedIn: false,
        };
    }

    //get put where
    getTweet = async () => {
        console.log("getTweet")
        const response = await fetch('https://getsuggestedfriends.azurewebsites.net/api/HttpTrigger', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'username': this.props.username
            }
        });
        const data = await response.json();
        this.setState({ tweet: data })
        console.log(this.state.tweet.length)
        const status = await response.status;
        if (status == 200) {
            console.log("ok")
            this.setState({ loggedIn: true });
            console.log(this.state.tweet.length)
        }
        console.log(this.state.tweet)
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
        this.setState({ open: false });
        console.log(this.state.open)
        this.getTweet();
    }

    textInputChanged_username = (event) => {
        this.setState({ username: event.target.value });
    }

    textInputChanged_password = (event) => {
        this.setState({ password: event.target.value });
    }
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
                        <Button color="inherit" onClick={this.handleLogin} >Login</Button>
                        <Button color="inherit" onClick={this.handleSignUp} >Create User</Button>
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
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="password"
                                    type="password"
                                    fullWidth
                                    onChange={this.textInputChanged_password} value={this.state.password}
                                />
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
                {this.state.loggedIn ? <UserProfile username={this.state.username} /> : null}

                {this.state.loggedIn ? < Timeline tweet={this.state.tweet} username ={this.state.username} /> : null}

            </div>);
    }

}