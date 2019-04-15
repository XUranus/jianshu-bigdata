import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Echarts from 'echarts-for-react';


const styles = {
    highlight:{
        color:'#FA8072'
    },
    main: {
        textAlign:'center',
    }
};

class DynamicTypeSection extends React.Component {

    render() {
        const classes = this.props.classes
        const option = {
            title : {
                text: '用户动态类型',
                subtext: '数据来源: www.jianshu.com',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            clockwise:false,
            legend: {
                orient: 'vertical',
                left: '10%',
                data: ["关注文集","赞赏文章","发表评论","关注用户","点赞评论","发表文章","喜欢文章","关注专题"]
            },
            color:['#FF6666','#EFE42A','#64BD3D','#EE9201','#29AAE3','#B74AE5','#0AAF9F','#E89589'],
            series : [
                {
                    name: '动态类型',
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '60%'],
                    data:this.props.data.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 100,
                            shadowOffsetX: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }   
                    }
                }
            ]
        };
        
        return (
        <div className={classes.main}>
            <Echarts 
                option={option} 
                style={{height:'500px'}}
            />                    
        </div>)
    }
}

DynamicTypeSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DynamicTypeSection);
