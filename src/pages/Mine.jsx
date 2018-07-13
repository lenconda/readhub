import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Mine extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.profile} onPress={Actions.login} activeOpacity={0.8}>
          <View style={styles.iconWrapper}>
            <Icon name={'user-circle-o'} size={60} color={'#4867ad'} style={{ fontWeight: '200' }} />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.headTitle}>Logged out</Text>
            <Text style={styles.subTitle}>Go login&nbsp;<Icon name={'angle-right'} /></Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f0f0f0'
  },

  profile: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  textWrapper: {
    flexGrow: 1,
  },

  headTitle: {
    fontSize: 24,
    color: '#333',
    fontWeight: '200',
    margin: 0,
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 12,
    color: '#4867ad',
  }
})