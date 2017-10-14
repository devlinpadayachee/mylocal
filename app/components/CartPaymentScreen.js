/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView,View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList,AsyncStorage } from 'react-native';
import { Header,Grid,Col,Container, Footer,FooterTab,Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import CreditCard, {CardImages} from 'react-native-credit-card';
import Swiper from 'react-native-swiper';
import firebaseApp from '../js/FirebaseApp';
import CartListItem from './CartListItem';
import * as cart from '../js/Cart';
var _ = require('lodash')

const {height, width} = Dimensions.get('window');
const SWIPER_HEIGHT = 180;
export default class CartPaymentScreen extends Component {

  constructor(props){
    super(props);
    this.ordersRef = this.getRef().child('orders');
    this.state = {
      loading: false,
      data : [],
      cart_item_count : null,
      total : 0,
      focused: 'name',
      number: '',
      name: '',
      cvc: '',
      expiry: '',
      index: 0,
      type: 'visa'
    }
  }
  async componentDidMount() {
    this.setState({loading: true})
    console.log("Checkout Screen Mounted");
    let current_cart = await cart.getCart();
    let total = _.sumBy(current_cart, 'total');
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,data:current_cart,total:total,cart_item_count:cart_item_count})
  }
  componentWillUnmount() {
    console.log("Checkout Screen UnMounted");
  }
  getRef() {
    return firebaseApp.database().ref();
  }
  renderCartItem = ({item}) => (
    <CartListItem item={item}/>
  );

  createOrder = async () => {
    this.setState({
      loading: true
    });
    console.log("searching for user");
    var user = await firebaseApp.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      console.log(uid)
    }
    var postData = {
      buyer: uid,
      cart : await cart.getCart(),
      cart_total : _.sumBy(await cart.getCart(), 'total'),
      cart_item_count : await cart.getCartCount(),
      createdAt : new Date,
      status : 'Pending'
    };
    var newOrderKey = this.ordersRef.push().key;
    var updates = {};
    updates[newOrderKey] = postData;
    AsyncStorage.setItem("cart", "[]");
    Actions.containerScreen({refresh:{test:Math.random()}});
    Alert.alert('Thank you for your purchase',"Order Submitted")
    this.setState({
      loading: false
    });
    // // Log in and display an alert to tell the user what happened.
    // firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
    //   this.setState({loading: false});
    //   Actions.containerScreen({});
    //   console.log('account created');
    // }).catch((error) => {
    //   this.setState({loading: false});
    //   Alert.alert('Login Failed',error.message)
    //   console.log(error);
    // });
    return this.ordersRef.update(updates);
  }


  onMomentumScrollEnd(e, state, context) {
       var indexMap = [
           'number',
           'name',
           'expiry',
           'cvc',
           'type',
       ];
       this.setState({
           index: state.index,
           focused: indexMap[state.index]
       }, () => {
           try {
               this.refs[indexMap[state.index]].focus();
           } catch(e) {

           }
       });
   }

  render() {

    const isLoading = this.state.loading;
    const cart_item_count = this.state.cart_item_count;

    var cardTypes = [];
       for (var key in CardImages) {
           cardTypes.push({type: key, image: CardImages[key]});
    }

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else if (cart_item_count == 0) {

        content = <View style={styles.container}>
                    <Grid>
                      <Col style={styles.col_details}>
                        <Text style={styles.col_header_text} >
                          No items in your cart
                        </Text>
                        <Text style={styles.col_default_text}>
                          Please add an item to your cart in order to checkout.
                        </Text>
                      </Col>
                    </Grid>
                  </View>
    }
    else {
        content = <View >
                    <View style={styles.info_grid} >

                      <Grid>
                        <Col style={styles.col_details}>
                          <Button  onPress={this.props.prevFn} full danger><Icon name='ios-arrow-back'/><Text style={styles.returnButtons}> Cart Summary</Text></Button>
                        </Col>
                        <Col style={styles.col_details}>
                          <Text style={styles.col_header_text} >
                            You are about to make a purchase of R{this.state.total}
                          </Text>
                          <Text style={styles.col_default_text}>
                            Complete your checkout details below
                          </Text>
                        </Col>
                      </Grid>
                    </View>

                    <View style={styles.container}>


                                  <TextInput
                                    onChangeText={(text) => this.setState({cardnumber: text})}
                                    value={this.state.email}
                                    placeholder = "Card Number"
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
                                    placeholder = "Card Holder"
                                    placeholderTextColor = 'rgba(255,255,255,0.7)'
                                    returnKeyType = "go"
                                    secureTextEntry
                                    underlineColorAndroid='transparent'
                                    ref={(input) => this.passwordInput = input}
                                    style={styles.input}
                                  />
                                  <View style={{flexDirection:'row', justifyContent:"space-around",alignItems:"stretch",}}>


                                                <TextInput
                                                  onChangeText={(text) => this.setState({cardnumber: text})}
                                                  value={this.state.email}
                                                  placeholder = "CCV"
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
                                                  placeholder = "Expiry Date"
                                                  placeholderTextColor = 'rgba(255,255,255,0.7)'
                                                  returnKeyType = "go"
                                                  secureTextEntry
                                                  underlineColorAndroid='transparent'
                                                  ref={(input) => this.passwordInput = input}
                                                  style={styles.input}
                                                />

                                  </View>
                                  <TouchableOpacity style={styles.buttonContainer} onPress={this.createOrder}>
                                    <Text style={styles.buttonText}>COMPLETE PURCHASE</Text>
                                  </TouchableOpacity>
                    </View>

                </View>;
    }
    return (
        <ScrollView >
          {content}
        </ScrollView>
    );
  }



}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
  	flex : 1,
    padding : 40
	},
  info_grid : {
    zIndex : 5,
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
  input: {
    height: 45,
    backgroundColor : 'rgba(255,255,255,0.2)',
    margin : 10,
    color : '#fff',
    paddingHorizontal : 15,
    opacity : 1,
    borderTopRightRadius: 15,
    fontWeight : '700',
    flex : 1,

  },
  buttonContainer :{
    backgroundColor : '#27ae60',
    paddingVertical : 15,
    margin : 10,
    borderColor: '#fff',
    borderTopLeftRadius: 15

  },
  buttonText : {
    textAlign : 'center',
    color : "#fff",
    fontWeight : '700'
  },
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
    opacity : 0.9
  },
  buttonGroup : {
    flex : 1,
    flexDirection : 'row',

    backgroundColor : '#2c3e50'
  },
  proceedButtons : {
    color : '#fff',
    alignItems : 'center',
    justifyContent :'center',
    marginRight : 10,
    fontSize : 12,
  },
  returnButtons : {
    color : '#fff',
    alignItems : 'center',
    justifyContent :'center',
    marginRight : 10,
    fontSize : 12,
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
