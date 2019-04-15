import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import SummarySection from './SummarySection'
import FirstTimeSection from './FirstTimeSection'
import DynamicTypeSection from './DynamicTypeSection.js'
import MonthlyDynamicCountsStatistic from './MonthlyDynamicCountsStatistic'
import DailyDynamicCountsStatistic from './DailyDynamicCountsStatistic'
import DailyDynamicStatisticSection from './DailyDynamicStatisticSection'
import WeeklyDynamicStatisticSection from './WeeklyDynamicStatisticSection'
import WeekArticlesPublishFrequencySection from './WeekArticlesPublishFrequencySection' 
import WordCloudSection from './WordCloudSection'
import ThanksSection from './ThanksSection'


class StatisticDisplay extends React.Component {
    render() {

        const data = this.props.data

        const summary = data.summary
        const first_time = data.first_time
        const dynamic_type_statistic = data.dynamic_type_statistic
        const monthly_dynamic_counts_statistic = data.monthly_dynamic_counts_statistic
        const daily_dynamic_counts_statistic = data.daily_dynamic_counts_statistic
        const daily_dynamic_statisic = data.daily_dynamic_statisic
        const weekly_dynamic_statistic = data.weekly_dynamic_statistic
        const week_articles_publish_frequency = data.week_articles_publish_frequency
        const word_cloud = data.word_cloud

        return (
        <ReactFullpage
            render={({ state, fullpageApi }) => {
            return (
                <ReactFullpage.Wrapper>
                    <div className="section"><SummarySection data={summary}/></div>
                    <div className="section"><FirstTimeSection data={first_time}/></div>
                    <div className="section"><DynamicTypeSection data={dynamic_type_statistic}/></div>
                    <div className="section"><MonthlyDynamicCountsStatistic data={monthly_dynamic_counts_statistic}/></div>
                    <div className="section"><DailyDynamicCountsStatistic data={daily_dynamic_counts_statistic}/></div>
                    <div className="section"><DailyDynamicStatisticSection data={daily_dynamic_statisic}/></div>
                    <div className="section"><WeeklyDynamicStatisticSection data={weekly_dynamic_statistic}/></div>
                    <div className="section"><WeekArticlesPublishFrequencySection data={week_articles_publish_frequency}/></div>
                    <div className="section"><WordCloudSection data={word_cloud}/></div>
                    <div className="section"><ThanksSection/></div>
                </ReactFullpage.Wrapper>
            );
            }}
        />
        )
    }
}

export default StatisticDisplay;