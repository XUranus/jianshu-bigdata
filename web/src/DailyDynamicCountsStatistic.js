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

class MonthlyDynamicCountsStatistic extends React.Component {

    render() {
        const classes = this.props.classes
        const data = this.props.data

        const option = {
            visualMap: {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                color:['red','orange','yellow','lightskyblue']
            },
            title: {
                left: 'center',
                text: '每天的动态次数(页内滚动鼠标或拖动下方进度条，可缩放数据)',
                subtext:'数据来源: www.jianshu.com'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.xAxisData,
                name:'日期'
            },
            yAxis: {
                splitLine: {show: false},
                name:'动态次数'
            },
            grid: {
                bottom: '10%',
                top: '12%'
            },
            series: {
                type: 'line',
                showSymbol: false,
                data: data.yAxisData
            },
            dataZoom: [
                {
                    type: 'slider',
                    show:true,
                    start: 0,
                    end:100
                },
                {
                    type:'inside',
                    start: 0,
                    end:100
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

MonthlyDynamicCountsStatistic.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MonthlyDynamicCountsStatistic);
