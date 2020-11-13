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

class WeeklyDynamicStatisticSection extends React.Component {

    render() {
        const classes = this.props.classes
        const data = this.props.data

        const option ={
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                left: 'center',
                text: '一周中的动态情况',
                subtext:'数据来源: www.jianshu.com'
            },
            grid: {
                left: '7%',
                right: '8%',
                bottom: '8%'
            },
            xAxis : [
                {
                    type : 'category',
                    data : ["周日","周一","周二","周三","周四","周五","周六"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:'动态次数'
                }
            ],
            series : [{
                name:'动态次数',
                type:'bar',
                barWidth: '50%',
                data:data.data,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            //首先定义一个数组
                            var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3','#B74AE5','#0AAF9F','#E89589'];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }]
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

WeeklyDynamicStatisticSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(WeeklyDynamicStatisticSection);
