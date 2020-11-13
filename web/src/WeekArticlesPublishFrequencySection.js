import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

var echarts = require('echarts');

const styles = {
    highlight:{
        color:'#FA8072'
    },
    main: {
        textAlign:'center',
    }
};

class WeekArticlesPublishFrequencySection extends React.Component {

    componentDidMount() {
        var myChart = echarts.init(document.getElementById("weekArticlesPublishFrenquencyCharts"));
        var data = this.props.data.data
        console.log(myChart)
        var hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am',
                    '7am', '8am', '9am','10am','11am','12pm', '1pm', '2pm', 
                    '3pm', '4pm', '5pm','6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
        var days = ['周日','周一', '周二','周三', '周四', '周五', '周六'];

        var option = {
            tooltip: {
                position: 'left'
            },
            title: [],
            color:['#FF6666','#EFE42A','#64BD3D','#EE9201','#29AAE3',
                '#B74AE5','#0AAF9F','#E89589'],
            singleAxis: [],
            series: []
        };

        echarts.util.each(days, function (day, idx) {
            option.title.push({
                textBaseline: 'middle',
                top: (idx + 0.5) * 100 / 7 + '%',
                text: day
            });
            option.singleAxis.push({
                left: 120,
                type: 'category',
                boundaryGap: false,
                data: hours,
                top: (idx * 100 / 7 + 5) + '%',
                height: (100 / 7 - 10) + '%',
                axisLabel: {
                    interval: 2
                }
            });
            option.series.push({
                singleAxisIndex: idx,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: [],
                symbolSize: function (dataItem) {
                    return dataItem[1] * 10;
                }
            });
        });

        echarts.util.each(data, function (dataItem) {
            option.series[dataItem.dync_hour].data.push([dataItem.col_hour, dataItem.hour_times]);
        });
        
        window.onresize = function () {
            myChart.resize();
        };

        myChart.setOption(option)
    }

    render() {
        const classes = this.props.classes

        return (
        <div className={classes.main}>
           <h4>一周中发表文章时间分布</h4>
           <div style={{height:'700px'}} id="weekArticlesPublishFrenquencyCharts"/>              
        </div>)
    }
}

WeekArticlesPublishFrequencySection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(WeekArticlesPublishFrequencySection);
