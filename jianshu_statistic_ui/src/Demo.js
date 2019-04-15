import React, { Component } from 'react';
import StatisticDisplay from './StatisticDisplay'


const data = {
    summary:{
        username:'__豆约翰__',
        avatar:'https://upload.jianshu.io/users/upload_avatars/468490/36742752-0caa-43f0-8d53-366eb1d475f1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
        cur_time:' 2019-04-14 14:31:41',
        user_followd_num:26,
        be_followed_num:150,
        articles_num:263,
        articles_words_num:234243,
        articles_be_liked_times:286,
        liked_articles_times:96,
        topics_followed_num:32,
        work_collects_followed_num:5,
        comment_times:7,
        like_comment_times:1,
        reward_authors_times:0,
    },
    first_time:{
        register:{
            time:'2015-05-09 13:24:28'
        },
        follow_user:{
            time:'2015-05-09 13:24:28',
            href:'132342g2hj4',
        },
        publish_article:{
            time:'2015-05-09 13:24:28',
            href:'234234234',
        },
        like_article:{
            time:'2015-05-09 13:24:28',
            href:'23434',
        },
        follow_topic:{
            time:'2015-05-09 13:24:28',
            href:'wefd2223f',
        },
        follow_work_collects:{
            time:'2015-05-09 13:24:28',
            href:'23rb3rr3',
        },
        make_comment:{
            time:'2015-05-09 13:24:28',
            content:'吧啦啦啦啦啦啦',
            href:'r23r2'
        },
        like_comment:{
            time:'2015-05-09 13:24:28',
            content:'吧爸爸爸爸爸爸啦啦啦',
            href:'23f32r'
        },
        reward_author:{
            time:'2015-05-09 13:24:28',
            title:'哈哈哈哈',
            href:'2r'
        }
    },
    dynamic_type_statistic:{
        data:[
            {name:'发表文章',value:339},
            {name:'关注文集',value:5},
            {name:'赞赏文章',value:0},
            {name:'发表评论',value:7},
            {name:'点赞评论',value:1},
            {name:'关注用户',value:94},
            {name:'喜欢文章',value:96},
            {name:'关注专题',value:32},
        ]
    },
    monthly_dynamic_counts_statistic:{
        xAxisData: ["2015-05","2017-05","2017-06","2017-07","2017-08","2017-12","2018-01","2018-02","2018-03","2018-04","2018-05","2018-06","2018-07","2018-08","2018-09","2018-10","2018-11","2018-12","2019-01","2019-02","2019-03","2019-04"],
        yAxisData: [1,6,3,1,2,30,16,17,19,10,12,1,114,23,21,32,17,74,80,56,69,36],
    },
    daily_dynamic_counts_statistic:{
        xAxisData: ["2015-05-09","2017-05-19","2017-05-28","2017-05-30","2017-06-01","2017-06-04","2017-06-08","2017-07-08","2017-08-17","2017-12-13","2017-12-15","2017-12-16","2017-12-17","2017-12-18","2017-12-19","2017-12-23","2017-12-29","2018-01-02","2018-01-11","2018-01-15","2018-01-17","2018-01-18","2018-01-27","2018-01-29","2018-02-03","2018-02-11","2018-02-15","2018-02-19","2018-02-20","2018-02-23","2018-03-06","2018-03-07","2018-03-08","2018-03-10","2018-03-11","2018-03-14","2018-03-15","2018-03-16","2018-03-17","2018-03-18","2018-03-19","2018-03-22","2018-04-09","2018-04-10","2018-04-17","2018-04-20","2018-04-23","2018-05-03","2018-05-04","2018-05-07","2018-05-21","2018-05-22","2018-05-29","2018-06-19","2018-07-10","2018-07-16","2018-07-17","2018-07-18","2018-07-19","2018-07-20","2018-07-21","2018-07-22","2018-07-23","2018-07-24","2018-07-25","2018-08-02","2018-08-05","2018-08-08","2018-08-09","2018-08-10","2018-08-11","2018-08-14","2018-08-16","2018-08-17","2018-08-22","2018-08-23","2018-08-24","2018-08-28","2018-08-29","2018-09-01","2018-09-04","2018-09-11","2018-09-17","2018-09-18","2018-09-19","2018-09-21","2018-09-27","2018-09-28","2018-09-29","2018-09-30","2018-10-03","2018-10-06","2018-10-07","2018-10-09","2018-10-10","2018-10-11","2018-10-13","2018-10-14","2018-10-16","2018-10-17","2018-10-21","2018-10-25","2018-10-26","2018-10-29","2018-10-30","2018-10-31","2018-11-02","2018-11-06","2018-11-10","2018-11-16","2018-11-19","2018-11-21","2018-11-25","2018-11-28","2018-11-29","2018-11-30","2018-12-01","2018-12-02","2018-12-04","2018-12-11","2018-12-13","2018-12-15","2018-12-16","2018-12-17","2018-12-19","2018-12-24","2018-12-25","2018-12-28","2018-12-29","2018-12-30","2018-12-31","2019-01-01","2019-01-03","2019-01-05","2019-01-08","2019-01-09","2019-01-11","2019-01-12","2019-01-13","2019-01-14","2019-01-17","2019-01-20","2019-01-21","2019-01-22","2019-01-23","2019-01-24","2019-01-25","2019-01-27","2019-01-29","2019-01-30","2019-01-31","2019-02-01","2019-02-02","2019-02-03","2019-02-04","2019-02-05","2019-02-10","2019-02-11","2019-02-13","2019-02-14","2019-02-17","2019-02-18","2019-02-19","2019-02-20","2019-02-23","2019-02-26","2019-02-27","2019-02-28","2019-03-01","2019-03-04","2019-03-05","2019-03-06","2019-03-08","2019-03-09","2019-03-10","2019-03-12","2019-03-14","2019-03-15","2019-03-16","2019-03-17","2019-03-19","2019-03-20","2019-03-21","2019-03-24","2019-03-25","2019-03-26","2019-03-27","2019-03-28","2019-03-29","2019-03-30","2019-03-31","2019-04-01","2019-04-02","2019-04-05","2019-04-06","2019-04-07","2019-04-08","2019-04-09","2019-04-10","2019-04-12","2019-04-14","2019-04-15"],
        yAxisData:[1,2,3,1,1,1,1,1,2,2,1,4,6,1,2,13,1,1,3,1,1,1,8,1,8,1,1,2,3,2,2,2,2,1,2,1,1,1,2,2,2,1,1,2,4,2,1,6,1,1,1,2,1,1,2,2,1,1,55,8,20,18,4,2,1,1,4,3,1,1,1,5,1,1,1,1,1,1,1,1,1,2,4,4,2,2,1,1,1,2,2,3,1,1,2,1,2,1,1,5,2,1,4,3,1,2,5,2,2,1,2,1,1,1,1,1,2,1,2,2,1,3,20,4,3,3,2,1,1,25,4,4,1,6,2,5,1,2,4,6,3,16,3,4,9,4,2,1,3,3,1,3,3,3,1,2,1,19,1,3,2,2,2,6,2,1,2,3,5,2,3,3,3,2,1,5,3,3,1,3,7,2,5,3,1,1,1,1,6,3,5,2,3,6,4,8,3,1,1,1,2,5]
    },
    daily_dynamic_statisic:{
        data:[1,1,1,3,50,65,56,44,93,59,17,77,12,28,23,33,23,8,6,25,13,2]
    },
    weekly_dynamic_statistic:{
        data:[139,81,86,64,107,66,97]
    },
    week_articles_publish_frequency:{
        data: [{"col_hour":10,"dync_hour":4,"hour_times":43},{"col_hour":9,"dync_hour":6,"hour_times":11},{"col_hour":22,"dync_hour":4,"hour_times":4},{"col_hour":9,"dync_hour":0,"hour_times":2},{"col_hour":22,"dync_hour":1,"hour_times":3},{"col_hour":16,"dync_hour":6,"hour_times":5},{"col_hour":13,"dync_hour":1,"hour_times":11},{"col_hour":13,"dync_hour":5,"hour_times":3},{"col_hour":15,"dync_hour":1,"hour_times":2},{"col_hour":9,"dync_hour":2,"hour_times":6},{"col_hour":17,"dync_hour":1,"hour_times":1},{"col_hour":4,"dync_hour":0,"hour_times":1},{"col_hour":10,"dync_hour":1,"hour_times":1},{"col_hour":13,"dync_hour":6,"hour_times":9},{"col_hour":8,"dync_hour":1,"hour_times":17},{"col_hour":15,"dync_hour":2,"hour_times":4},{"col_hour":10,"dync_hour":6,"hour_times":7},{"col_hour":18,"dync_hour":3,"hour_times":5},{"col_hour":21,"dync_hour":5,"hour_times":1},{"col_hour":10,"dync_hour":5,"hour_times":3},{"col_hour":23,"dync_hour":0,"hour_times":1},{"col_hour":17,"dync_hour":0,"hour_times":5},{"col_hour":17,"dync_hour":6,"hour_times":2},{"col_hour":22,"dync_hour":5,"hour_times":1},{"col_hour":10,"dync_hour":2,"hour_times":3},{"col_hour":20,"dync_hour":6,"hour_times":2},{"col_hour":16,"dync_hour":1,"hour_times":3},{"col_hour":11,"dync_hour":2,"hour_times":3},{"col_hour":8,"dync_hour":4,"hour_times":3},{"col_hour":14,"dync_hour":1,"hour_times":2},{"col_hour":9,"dync_hour":4,"hour_times":6},{"col_hour":18,"dync_hour":6,"hour_times":2},{"col_hour":14,"dync_hour":5,"hour_times":1},{"col_hour":21,"dync_hour":0,"hour_times":1},{"col_hour":17,"dync_hour":4,"hour_times":3},{"col_hour":7,"dync_hour":0,"hour_times":4},{"col_hour":11,"dync_hour":5,"hour_times":9},{"col_hour":6,"dync_hour":0,"hour_times":19},{"col_hour":12,"dync_hour":2,"hour_times":5},{"col_hour":14,"dync_hour":2,"hour_times":1},{"col_hour":11,"dync_hour":4,"hour_times":4},{"col_hour":21,"dync_hour":4,"hour_times":4},{"col_hour":15,"dync_hour":3,"hour_times":1},{"col_hour":19,"dync_hour":6,"hour_times":2},{"col_hour":7,"dync_hour":6,"hour_times":5},{"col_hour":14,"dync_hour":3,"hour_times":2},{"col_hour":21,"dync_hour":1,"hour_times":4},{"col_hour":12,"dync_hour":4,"hour_times":2},{"col_hour":12,"dync_hour":0,"hour_times":2},{"col_hour":23,"dync_hour":2,"hour_times":1},{"col_hour":15,"dync_hour":5,"hour_times":2},{"col_hour":8,"dync_hour":2,"hour_times":2},{"col_hour":15,"dync_hour":0,"hour_times":6},{"col_hour":12,"dync_hour":1,"hour_times":1},{"col_hour":7,"dync_hour":3,"hour_times":4},{"col_hour":10,"dync_hour":0,"hour_times":18},{"col_hour":11,"dync_hour":1,"hour_times":9},{"col_hour":17,"dync_hour":2,"hour_times":1},{"col_hour":17,"dync_hour":3,"hour_times":3},{"col_hour":9,"dync_hour":1,"hour_times":4},{"col_hour":14,"dync_hour":0,"hour_times":2},{"col_hour":9,"dync_hour":3,"hour_times":3},{"col_hour":8,"dync_hour":0,"hour_times":5},{"col_hour":21,"dync_hour":6,"hour_times":8},{"col_hour":16,"dync_hour":2,"hour_times":2},{"col_hour":11,"dync_hour":0,"hour_times":16},{"col_hour":13,"dync_hour":4,"hour_times":14},{"col_hour":16,"dync_hour":4,"hour_times":1},{"col_hour":13,"dync_hour":3,"hour_times":7},{"col_hour":8,"dync_hour":6,"hour_times":11},{"col_hour":10,"dync_hour":3,"hour_times":4},{"col_hour":16,"dync_hour":3,"hour_times":7},{"col_hour":13,"dync_hour":2,"hour_times":14},{"col_hour":17,"dync_hour":5,"hour_times":3},{"col_hour":15,"dync_hour":4,"hour_times":3},{"col_hour":9,"dync_hour":5,"hour_times":3},{"col_hour":7,"dync_hour":1,"hour_times":1},{"col_hour":6,"dync_hour":1,"hour_times":1},{"col_hour":11,"dync_hour":6,"hour_times":4},{"col_hour":13,"dync_hour":0,"hour_times":1},{"col_hour":8,"dync_hour":3,"hour_times":1}]
    },
    word_cloud:{
        total_comments_num:7,
        data:[{"name":"","value":22},{"name":"小","value":2},{"name":"是","value":2},{"name":"七","value":1},{"name":"的","value":1},{"name":"很","value":1},{"name":"下","value":1},{"name":"不是","value":1},{"name":"百分比","value":1},{"name":"不","value":1},{"name":"野猫","value":1},{"name":"加油","value":1},{"name":"道","value":1},{"name":"一定","value":1},{"name":"东软","value":1},{"name":"必须","value":1},{"name":"可以","value":1},{"name":"隧道","value":1},{"name":"也","value":1},{"name":"河沿","value":1},{"name":"d","value":1},{"name":"不错","value":1},{"name":"gff","value":1},{"name":"葩","value":1},{"name":"emoj","value":1},{"name":"葭","value":1},{"name":"韵","value":1},{"name":"具体","value":1},{"name":"蒹","value":1},{"name":"值","value":1},{"name":"徽","value":1},{"name":"睿","value":1}]
    }
}


class Demo extends Component {
  render() {
    return (
      <StatisticDisplay data={data}/>
    );
  }
}

export default Demo;
