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
                text: '各个月份的动态次数',
                subtext:'数据来源: www.jianshu.com'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.xAxisData,
                name:'月份'
            },
            yAxis: {
                splitLine: {show: false},
                name:'动态次数'
            },
            grid: {
                bottom: '6%',
                top: '10%'
            },
            series: {
                type: 'line',
                showSymbol: false,
                data: data.yAxisData,
                markPoint : {
                    data : [
                        {type : 'max',
                            name: '最大值'
                        }
                    ]
                },
                markLine: {
                    data: [
                        {
                            type: 'average', name: '平均值',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: '月平均值:{c}'
                                }
                            }
                        },
                        {
                            type: 'max', name: '最大值',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: '最大值'
                                }
                            }
                        }
                    ]
                }
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

MonthlyDynamicCountsStatistic.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(MonthlyDynamicCountsStatistic);
