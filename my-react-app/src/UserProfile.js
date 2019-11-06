import React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default class UserProfile extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Welcome! {this.props.username}
      </Typography>
    )
  }
}