import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RefreshListView, { RefreshState } from '../components/RefreshListView'
import { List, Toast } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { change_career } from '../redux/actions'
import api from '../api'
import utils from '../utils'


const mapStateToProps = state => {
  return {
    career: state.career
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeCareer: (career) => {
      console.log('dispatching career to store...')
      dispatch(change_career(career))
    }
  }
}

class Careers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      careerItems: [],
      RefreshState: RefreshState.Idle,
      lastCursor: utils.getTimeStamp()
    }
  }

  getCareers = (isFooterRefreshing = false, lastCursor = null) => {
    api.get(`/jobs?pageSize=10&lastCursor=${lastCursor || this.state.lastCursor}`).then(res => {
      if (!isFooterRefreshing) { Toast.success('刷新成功', 1) }
      this.setState({
        careerItems: isFooterRefreshing ? [...this.state.careerItems, ...res.data.data] : res.data.data,
        RefreshState: RefreshState.Idle,
        lastCursor: Date.parse(new Date(res.data.data[res.data.data.length - 1].publishDate))
      })
    }).catch(error => {
      this.setState({
        RefreshState: RefreshState.Idle
      })
      Toast.fail('刷新失败', 1)
    })
  }

  componentDidMount() {
    console.log('Careers initializing...')
    this.getCareers()
  }

  onHeaderRefresh = () => {
    this.setState({RefreshState: RefreshState.HeaderRefreshing})
    console.log('Head refreshing...')
    this.getCareers(false, utils.getTimeStamp())
  }

  onFooterRefresh = () => {
    this.setState({RefreshState: RefreshState.FooterRefreshing})
    console.log('Foot refreshing...')
    this.getCareers(true)
  }

  careerItem = ({ item }) => {
    return <List style={styles.jobList}>
      <List.Item multipleLine={true} wrap={true} arrow={'horizontal'} onClick={() => {
        this.props.changeCareer(item)
        Actions.push('careerContainer')
      }}>
        {item.jobTitle}
        <List.Item.Brief style={{ marginTop: 10, marginBottom: 10 }}>
          {

            !item.jobsArray ? '' :
            item.jobsArray.map((career, index) => {
              return `${career.title}${index === item.jobsArray.length - 1 ? '' : ' · ' }`
            })
          }
        </List.Item.Brief>
        <List.Item.Brief>
          <Text style={{ marginTop: 10, color: '#4867ad' }}>
            <Icon name={'map'} />
            &nbsp;{
              Object.keys(item.cities).map((city, index) => {
                return `${city}${index === Object.keys(item.cities).length - 1 ? '' : '、'}`
              })
            }
          </Text>
        </List.Item.Brief>
        <List.Item.Brief>
          <Text style={{ color: '#d65949' }}><Icon name={'money'} />&nbsp;{utils.convertJobSalary(item.salaryLower, item.salaryUpper)}</Text>
        </List.Item.Brief>
        <List.Item.Brief>
          <Text style={{ color: '#666' }}><Icon name={'briefcase'} />&nbsp;{utils.convertJobExperience(item.experienceLower, item.experienceUpper)}</Text>
        </List.Item.Brief>
      </List.Item>
    </List>
  }

  render() {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.careerItems}
          renderItem={this.careerItem}
          refreshState={this.state.RefreshState}
          keyExtractor={(item, index) => index.toString()}
          onHeaderRefresh={() => {this.onHeaderRefresh()}}
          onFooterRefresh={() => {
            if (this.state.RefreshState === RefreshState.FooterRefreshing) return
            this.onFooterRefresh()
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },

  jobList: {
    marginTop: 10,
    marginBottom: 10,
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(Careers)