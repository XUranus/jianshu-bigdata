import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    highlight:{
        color:'#FA8072'
    },
    main: {
        textAlign:'center'
    },
    avatar: {
        maxWidth:'40%',
        maxHeight:'40%'
    }
};

class SummarySection extends React.Component {

    render() {
        const summary = this.props.data
        const classes = this.props.classes

        return (
        <div className={classes.main}>
            <img src={summary.avatar} className={classes.avatar}/>
                    
            <p>你好! <span className={classes.highlight}>{summary.username}</span></p>
            
            <p>截止至<span className={classes.highlight}>{summary.cur_time}</span></p>
            
            <p>你在简书关注了<span className={classes.highlight}>{summary.user_followed_num}</span>个用户,
            拥有粉丝<span className={classes.highlight}>{summary.be_followed_num}个</span></p>
            
            <p>发表文章<span className={classes.highlight}>{summary.articles_num}</span>篇，
            写下文字<span className={classes.highlight}>{summary.articles_words_num}</span>个，文章收获喜欢
            <span className={classes.highlight}>{summary.articles_be_liked_times}</span>个，喜欢文章
            <span className={classes.highlight}>{summary.liked_articles_times}</span>篇</p>
            
            <p>关注专题<span className={classes.highlight}>{summary.topics_followed_num}</span>个，关注文集
            <span className={classes.highlight}>{summary.work_collects_followed_num}</span>个</p>
            
            <p>发表评论<span className={classes.highlight}>{summary.comment_tims}</span>次，
            点赞别人评论<span className={classes.highlight}>{summary.like_comment_times}</span>次</p>
            
            <p>打赏文章<span className={classes.highlight}>{summary.reward_authors_times}</span>次</p>
                    
        </div>)
    }
}

SummarySection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(SummarySection);
