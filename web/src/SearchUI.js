import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from './static/logo.png'

const styles = {
  root: {
    flexGrow: 1,
  },
  main: {
      textAlign:'center',
     
      margin:'20px',
      clear:'both'
  },
  input: {
      width:'50%'
  }
};

function renderHashCode(hashCode) {
    if(hashCode===null || hashCode==='')
        return null
    var arr = hashCode.split('/')
    if(arr.length>0) 
        return arr[arr.length-1]
    else 
        return hashCode
}

function check(hasCode) {
    if(hasCode===null)
        return false
    else 
        return true
}

function submitHashCode(e) {
    let hashCode = document.getElementById('hashCodeInput').value
    hashCode = renderHashCode(hashCode)
    if(check(hashCode))
        window.location.href = `/user/${hashCode}`
    else 
        alert('输入不合法！')
}

function SearchUI(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            简书
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <img src={logo}/><br/>
        <TextField
          id="hashCodeInput"
          label="输入主页地址"
          margin="dense"
          variant="outlined"
          className={classes.input}
        /><br/><br/>
        <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={submitHashCode}
        >
         查询结果
        </Button>
      </main>
    </div>
  );
}

SearchUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchUI);
