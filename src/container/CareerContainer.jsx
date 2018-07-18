import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { List } from 'antd-mobile'

import utils from '../utils'

const mapStateToProps = state => ({
  jobDetail: state.careers
})

class CareerContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: '',
      onRight: () => null
    })
  }

  render() {

    let job = this.props.jobDetail
    console.log(job.cities)

    return (
      <ScrollView style={styles.container}>
        <View style={styles.summaryContainer}>
          <Text style={styles.jobTitle}>{job.jobTitle}</Text>
          <Text style={styles.jobSummary}>在{Object.keys(job.cities).map((city, index) => {
              return `${city}${index === Object.keys(job.cities).length - 1 ? '' : '、'}`
            })}等地的{job.jobCount}个职位，待遇大约{utils.convertJobSalary(job.salaryLower, job.salaryUpper)}，一般要求{utils.convertJobExperience(job.experienceLower, job.experienceUpper)}
          </Text>
        </View>
        <View style={styles.jobListContainer}>
          <List>
            {
              job.jobsArray.map((jobInfo, index) => {
                return <List.Item
                  arrow={'horizontal'}
                  multipleLine={true}
                  wrap={true}
                  key={index}
                  extra={<Text style={{ fontSize: 12, color: '#999' }}>{jobInfo.siteName}</Text>}
                  onClick={() => {
                    Actions.push('newsContainer', {url: jobInfo.url})
                  }}
                >
                  <Text>
                    <Text style={{ color: '#4687ad', fontWeight: '700' }}>{jobInfo.city ? `[${jobInfo.city}] ` : ''}</Text>
                    <Text>{jobInfo.company}·</Text>
                    <Text style={{ fontWeight: '700' }}>{jobInfo.title}</Text>
                  </Text>
                  <List.Item.Brief style={{ color: '#d65949' }}>{utils.convertJobSalary(jobInfo.salaryLower, jobInfo.salaryUpper)}</List.Item.Brief>
                  &nbsp;
                  <List.Item.Brief>{utils.convertJobExperience(jobInfo.experienceLower, jobInfo.experienceUpper)}</List.Item.Brief>
                </List.Item>
              })
            }
          </List>
        </View>
      </ScrollView>
    )

  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 14,
  },

  summaryContainer: {
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 20,
  },

  jobTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
    marginBottom: 32,
  },

  jobSummary: {
    fontSize: 14,
    color: '#797979',
  },

  jobListContainer: {
    marginTop: 20,
  },

})

export default connect(mapStateToProps)(CareerContainer)