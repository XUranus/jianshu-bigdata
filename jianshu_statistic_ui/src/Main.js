import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import env from './EnvLoader'
import StatisticDisplay from './StatisticDisplay'


const styles = {
    loading: {
        width: '60px',
        height: '60px',
        textAlign: 'center',
        position:'fixed',
        left:'50%',
        top:'50%',
        marginTop:'-30px',
        marginLeft:'-25px',
    }
}

const Loading = (props)=>{
    return (
        <div style={styles.loading}>
            <CircularProgress disableShrink />  
            <h3>查询中</h3>
        </div>  
    )
}

class Main extends React.Component {
    state = {data:null}
    
    componentDidMount() {
        let hashCode = this.props.location.pathname.split('/')[2]
        console.log('hashCode:',hashCode)
        
        axios({
            method:'post',
            url:env.apiServerAddr+'/api/submit',
            data:{uid:hashCode},
            withCredentials:true,
            crossDomain:true,
        }).then(function (res) {
            console.log(res);
            if(res.data.succ) {
                this.setState({data:res.data.data})
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if(this.state.data===null) {
            return <Loading/>
        } else {
            return <StatisticDisplay data={this.state.data}/>
        }
    }
}


export default withStyles(styles)(Main);
