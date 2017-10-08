/* @Boiler React Component */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,Image,KeyboardAvoidingView,AsyncStorage} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import Wallpaper from './Wallpaper';
import logoImg from '../images/logo.png';

export default class LoginScreen extends Component {
  constructor(props) {

    super(props);
    console.log("Resetting cart");
    AsyncStorage.setItem("cart", "[]");
    this.state = {
    }
  }
  componentDidMount() {
    console.log("Component did mount");
  }
  componentWillUnmount() {
    console.log("Component will unmount");
  }
  render() {
    return (
      <View style={styles.content}>
        <Wallpaper>
          <KeyboardAvoidingView behavior='padding' style={styles.container}>

              <View style={styles.logoContainer}>
                <Image source={logoImg} style={styles.logo} />
              </View>
              <View style={styles.formContainer}>
                <LoginForm/>
              </View>
              <View style={styles.textContainer}>
                <Button transparent primary onPress={this.signUp}>
                   <Text>Create Account</Text>
                </Button>
                <Button transparent primary onPress={this.forgotpassword}>
                   <Text>Forgot Password?</Text>
                </Button>
              </View>
          </KeyboardAvoidingView>
        </Wallpaper>
      </View>
    );
  }
  signUp = () => {
    console.log("Moving to Signup Screen");
    Actions.signupScreen({data: "Custom data2", title: "Custom title2"});
  }

  forgotpassword = () => {
    console.log("Moving to Forgot Screen");
    Actions.forgotpasswordScreen({data: "Custom data2", title: "Custom title2"});
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  content: {
    flex : 1,
    backgroundColor : '#212121'
  },
  container: {
    flex : 1,
    backgroundColor : '#212121',
    opacity : 0.9
  },
  logoContainer: {
    flexGrow : 1,
    marginTop : 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
  formContainer: {

	},
  textContainer: {
		flex: 1,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
  text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
  logo : {
    width : DEVICE_WIDTH/1.5,
    height : DEVICE_WIDTH/3
  }
});
