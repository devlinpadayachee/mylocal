/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar } from 'react-native';
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import firebaseApp from '../js/FirebaseApp';

export default class SignupForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }
  componentDidMount() {
    console.log("Component Signup Form Mounted");
  }
  componentWillUnmount() {
    console.log("Component Signup Form UnMounted");
  }
  render() {

    console.log(this.state.loading);
    const isLoading = this.state.loading

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else {
        content = <View style={styles.container}>
                      <StatusBar
                        barSytle="light-content"
                      />
                      <TextInput
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder = "Email Address"
                        placeholderTextColor = 'rgba(255,255,255,0.7)'
                        returnKeyType = "next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType = "email-address"
                        autoCapitalize="none"
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        style={styles.input}
                      />
                      <TextInput
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        placeholder = "Password"
                        placeholderTextColor = 'rgba(255,255,255,0.7)'
                        returnKeyType = "go"
                        secureTextEntry
                        underlineColorAndroid='transparent'
                        ref={(input) => this.passwordInput = input}
                        style={styles.input}
                      />
                      <TouchableOpacity style={styles.buttonContainer} onPress={this.signup}>
                        <Text style={styles.buttonText}>Create Account</Text>
                      </TouchableOpacity>
                    </View>;
    }
    return (
      <View>
        {content}
      </View>
    );
  }
  _onPressButton = () => {
    console.log("Default Button Handler");
  }
  signup = () => {
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.setState({loading: false});
        Alert.alert('Awesome','Account Created')
        Actions.loginScreen({});
        console.log('account created');
    }).catch((error) => {
        this.setState({loading: false});
        Alert.alert('Create Account Error',error.message)
        console.log(error);
    });
  }
  //
  // // Go to the signup page
  // goToSignup(){
  //   this.props.navigator.push({
  //     component: Signup
  //   });
  // }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
  	padding : 20
	},
  input: {
    height: 45,
    backgroundColor : 'rgba(255,255,255,0.2)',
    marginBottom : 15,
    color : '#fff',
    paddingHorizontal : 15,
    opacity : 1,
    borderTopRightRadius: 15,
    fontWeight : '700'
  },
  buttonContainer :{
    backgroundColor : '#27ae60',
    paddingVertical : 15,
		borderColor: '#fff',
		borderTopLeftRadius: 15

  },
  buttonText : {
    textAlign : 'center',
    color : "#fff",
    fontWeight : '700'
  }
});
