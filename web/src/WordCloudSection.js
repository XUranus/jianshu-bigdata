import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

var echarts = require('echarts');
require('echarts-wordcloud');


const styles = {
    highlight:{
        color:'#FA8072'
    },
    main: {
        textAlign:'center',
    }
};

class WordCloudSection extends React.Component {

    componentDidMount(){
        const data = this.props.data
        
        var option = {
            title: {
                text: '',
                link: 'http://www.google.com/trends/hottrends'
            },
            tooltip: {
                show: true
            },
            series: [{
                type: 'wordCloud',//类型为字符云
                gridSize: 30,//网格尺寸
                sizeRange: [20, 180],
                rotationRange: [-90, 90],//旋转范围
                shape: 'pentagon',
                autoSize: {
                    enable: true,
                    minSize: 20
                },
        
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 255),
                                    Math.round(Math.random() * 255),
                                    Math.round(Math.random() * 255)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,//阴影距离
                        shadowColor: '#333'//阴影颜色
                    }
                },
                data: data.data
            }]
        };

        var chart = echarts.init(document.getElementById('wordcloud'));
        chart.setOption(option)

    }

    render() {
        const classes = this.props.classes
    
        return (
            <div className={classes.main}>
                <p>评论 {this.props.data.total_comments_num} 条，以下词语出现频率较高</p>
                <div style={{height:'500px'}} id = "wordcloud"/>
            </div>
        )
    }
}

WordCloudSection.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(WordCloudSection);
