/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList,AsyncStorage } from 'react-native';
import { Header,Grid,Col,Container, Footer,FooterTab,Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import CartListItem from './CartListItem';
import MultiStep from 'react-native-multistep-wizard'
import CartSummaryScreen from './CartSummaryScreen'
import CartPaymentScreen from './CartPaymentScreen'
import * as cart from '../js/Cart';
var _ = require('lodash')
const steps = [{name: 'CartSummaryScreen', component: <CartSummaryScreen/>},{name: 'CartPaymentScreen', component: <CartPaymentScreen/>}];

export default class CheckoutScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
      total : 0
    }
  }
  async componentDidMount() {

  }
  componentWillUnmount() {
    console.log("Checkout Screen UnMounted");
  }


  render() {

    const isLoading = this.state.loading;

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }

    else {
        content =  <MultiStep steps={steps} onFinish={this.finish}/>;
    }
    return (

      <Container style={{backgroundColor:'#27ae60'}}>
        <Image style={styles.background} source={require('../images/background.png')} resizeMode={'cover'} />
        <Header style={styles.header}>
          <Left style={styles.headerleft}>
            <Button transparent  onPress={() => Actions.pop()} >
              <Icon name='ios-arrow-back'/>
            </Button>
          </Left>
          <Body style={styles.headerbody}>
            <Title style={styles.headertitle}>Checkout</Title>
          </Body>
        </Header>
        <Content style={styles.containerc}>
          {content}
        </Content>
      </Container>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
  	flex : 1,
    backgroundColor : '#fff',
    justifyContent: 'center'
	},
  background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
  },
  containerc: {
  	flex : 1,
	},
  header:{
    justifyContent  :"space-between",
    height : 70,
    backgroundColor : '#2c3e50',
  },
  headerleft:{
    maxWidth : 40
  },
  submitOrderButton : {
    color : '#fff',
    fontSize : 15,
  },
  headertitle : {
    fontSize : 15,
  },
  total_container: {
    color : '#fff',
    opacity : 0.9,
    fontSize : 20,
    fontWeight : '400'
	},
  col_details : {
    alignItems : 'center',
    padding : 10,
    justifyContent : 'center',
    backgroundColor : '#ecf0f1'
  },
  col_default_text: {
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 12,
    fontWeight : '400'
  },
  col_header_text: {
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 13,
    fontWeight : '500'
  },
});
