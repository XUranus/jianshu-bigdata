import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    highlight:{
        color:'#FA8072'
    },
    main: {
        textAlign:'center'
    }
};

class FirstTimeSection extends React.Component {

    render() {
        const first_time = this.props.data
        const classes = this.props.classes

        return (
        <div className={classes.main}>
        <h3>加入简书以来的第一次</h3>
        
        <p>您于 <span className={classes.highlight}>{first_time.register.time}</span> 注册，加入简书</p>
        
        <p><span className={classes.highlight}>{first_time.follow_user.time}</span>
        &nbsp;&nbsp;<a href={first_time.follow_user.href}>第一次关注用户</a></p>
        
        <p><span className={classes.highlight}>{first_time.follow_user.time}</span>
        &nbsp;&nbsp;<a href={first_time.publish_article.href}>第一次发表文章</a></p>
        
        <p><span className={classes.highlight}>{first_time.publish_article.time}</span>
        &nbsp;&nbsp;<a href={first_time.like_article.href}>第一次喜欢文章</a></p>
        
        <p><span className={classes.highlight}>{first_time.like_article.time}</span>
        &nbsp;&nbsp;<a href={first_time.follow_topic.href}>第一次关注专题</a></p>
        
        <p><span className={classes.highlight}>{first_time.follow_work_collects.time}</span>
        &nbsp;&nbsp;<a href={first_time.follow_work_collects.href}>第一次关注文集</a></p>

        <p><span className={classes.highlight}>{first_time.make_comment.time}</span>
        &nbsp;&nbsp;第一次发表评论：&nbsp;<a href={first_time.make_comment.href}>{first_time.make_comment.content}</a></p>
    
        <p><span className={classes.highlight}>{first_time.like_comment.time}</span>
        &nbsp;&nbsp;第一次赞了评论：&nbsp;<a href={first_time.like_comment.href}>{first_time.like_comment.content}</a></p>

        <p><span className={classes.highlight}>{first_time.reward_author.time}</span>
        &nbsp;&nbsp;第一次打赏文章：&nbsp;<a href={first_time.reward_author.href}>{first_time.reward_author.title}</a></p>
    
        </div>)
    }
}

FirstTimeSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FirstTimeSection);
