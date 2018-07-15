import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
// import { connect } from 'react-redux'
// import { login } from '../redux/actions/users'


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginForm: {
        username: '',
        password: '',
      },
      borderBtmUsername: '#999',
      borderBtmPassword: '#999',
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.isLoggedIn)
    if (nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn === true) {
      Actions.pop()
      return false
    }
    return true
  }

  changeUsernameState = newUsername => {
    let state = this.state
    state.loginForm.username = newUsername
    this.setState({state})
  }

  changePasswordState = newPassword => {
    let state = this.state
    state.loginForm.password = newPassword
    this.setState({state})
  }

  handleLogin = () => {
    let options = {
      name: this.state.loginForm.username,
      password: this.state.loginForm.password,
    }
    // this.props.dispatch(login(options))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.hintText}>Username</Text>
          <TextInput
            style={[{ borderBottomColor: this.state.borderBtmUsername }, styles.input]}
            autoCapitalize={'none'}
            onFocus={() => {this.setState({ borderBtmUsername: '#4867ad' })}}
            onBlur={() => {this.setState({ borderBtmUsername: '#999' })}}
            onChangeText={username => this.changeUsernameState(username)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.hintText}>Password</Text>
          <TextInput
            style={[{ borderBottomColor: this.state.borderBtmPassword }, styles.input]}
            autoCapitalize={'none'}
            secureTextEntry={true}
            onFocus={() => {this.setState({ borderBtmPassword: '#4867ad' })}}
            onBlur={() => {this.setState({ borderBtmPassword: '#999' })}}
            onChangeText={password => this.changePasswordState((password))}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.6}
          onPress={this.handleLogin}
        >
          <View>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <Button color={'#4867ad'} title={'Register...'} onPress={Actions.register} />
      </View>
    )
  }
}

// function select(store) {
//   return {
//     isLoggedIn: store.userStore.isLoggedIn,
//     user: store.userStore.user,
//     status: store.userStore.status,
//   }
// }

export default Login

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  hintText: {
    color: '#999',
    fontSize: 12,
  },

  input: {
    height: 28,
    width: 260,
    // borderBottomColor: '#999',
    borderBottomWidth: 1,
  },

  loginButton: {
    backgroundColor: '#4867ad',
    width: 200,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  }

})