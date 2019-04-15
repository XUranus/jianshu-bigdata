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

class DailyDynamicStatisticSection extends React.Component {

    render() {
        const classes = this.props.classes
        const data = this.props.data

        const option = {
            visualMap: {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                smooth:true,
                color:['red','orange','yellow','lightskyblue']
            },
            title: {
                left: 'center',
                text: '一天中各时间点的动态次数(几点最活跃？)',
                subtext:'数据来源: www.jianshu.com'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ["00","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
                name:'时间（24小时制）'
            },
            yAxis: {
                splitLine: {show: false},
                name:'动态次数'
            },
            grid:{
                bottom: '6%',
                        top: '10%'
            },
            series: {
                type: 'line',
                showSymbol: false,
                data: data.data
            }
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

DailyDynamicStatisticSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DailyDynamicStatisticSection);
