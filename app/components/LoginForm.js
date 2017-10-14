/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar } from 'react-native';
import { Header,Container,Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import firebaseApp from '../js/FirebaseApp';

export default class LoginForm extends Component {

  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }
  componentDidMount() {
    console.log("Component did mount");
  }
  componentWillUnmount() {
    console.log("Component will unmount");
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
        console.log("Loading Form Content");
        content = <Text>Region Longitude: {this.state.loading}</Text>;
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
                      <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                        <Text style={styles.buttonText}>Login</Text>
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
  login = () => {
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
      this.setState({loading: false});
      Actions.containerScreen({});
      // firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.SESSION)
      // .then(function() {
      //   console.log("setting session app auth")
      // });
    }).catch((error) => {
      this.setState({loading: false});
      Alert.alert('Login Failed',error.message)
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
    backgroundColor : '#c0392b',
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
