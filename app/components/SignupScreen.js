/* @Boiler React Component */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,Image,KeyboardAvoidingView} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SignupForm from './SignupForm';
import Wallpaper from './Wallpaper';
import logoImg from '../images/logo.png';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
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

              <View style={styles.formContainer}>
                <Button style={styles.backButton} iconLeft transparent primary onPress={Actions.pop}>
                   <Icon name='arrow-back' />
                   <Text>Back</Text>
                </Button>
              </View>
              <View style={styles.formContainer}>
                <SignupForm/>
              </View>


          </KeyboardAvoidingView>
        </Wallpaper>
      </View>
    );
  }
  _onPressButton = () => {
    console.log("Default Button Handler");
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
  formContainer: {

	},
  backButton : {
    marginTop : 25,
    paddingLeft : 25
  }
});
