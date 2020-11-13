import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    main: {
        textAlign:'center',
    },
    banner:{
        fontSize:'72px',
        color:'#FA8072'
    }
};

class ThanksSection extends React.Component {

    render() {
        const classes = this.props.classes

        return (
        <div className={classes.main}>
            <p className={classes.banner}>谢谢观赏</p>
            <p className={classes.banner}>----------end----------</p>
        </div>)
    }
}

ThanksSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ThanksSection);
