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
const SWIPER_HEIGHT = height;
export default class CartPaymentScreen extends Component {

  constructor(props){
    super(props);
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

  renderCartItem = ({item}) => (
    <CartListItem item={item}/>
  );

  nextPreprocess(){
    // Save step state for use in other steps of the wizard
    this.props.saveState(0,{key:'value'})
       // Go to next step
    this.props.nextFn()
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
        content = <View>
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
                    <Image style={styles.background} source={require('../images/background.png')} resizeMode={'cover'} />
                    <CreditCard
                      style = {{alignSelf : 'center',marginTop : 40}}
                      type={this.state.type}
                      imageFront={require('../images/card-front.png')}
                      imageBack={require('../images/card-back.png')}
                      shiny={false}
                      bar={false}
                      focused={this.state.focused}
                      number={this.state.number}
                      name={this.state.name}
                      expiry={this.state.expiry}
                      cvc={this.state.cvc}/>
                      <Swiper
                          style={styles.wrapper}
                          height={height}
                          showsButtons={true}
                          onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
                          ref={(swiper) => {this.swiper = swiper}}
                          index={this.state.index}>
                          <View style={styles.slide}>
                              <View style={styles.card}>
                                  <Text style={styles.textNumber}>CARD NUMBER</Text>
                                  <TextInput ref="number" keyboardType="phone-pad" autoCorrect={false} autoFocus={true} value={this.state.number} onChangeText={(number) => this.setState({number})}/>
                              </View>
                          </View>
                          <View style={styles.slide}>
                              <View style={styles.card}>
                                  <Text style={styles.textName}>CARD HOLDERS NAME</Text>
                                  <TextInput ref="name"  caretHidden={true} autoCorrect={false} value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                              </View>
                          </View>
                          <View style={styles.slide}>
                              <View style={styles.card}>
                                  <Text style={styles.textName}>EXPIRY</Text>
                                  <TextInput ref="expiry" autoCorrect={false} value={this.state.expiry} onChangeText={(expiry) => this.setState({expiry})}/>
                              </View>
                          </View>
                          <View style={styles.slide}>
                              <View style={styles.card}>
                                  <Text style={styles.textCvc}>CVV/CVC NUMBER</Text>
                                  <TextInput ref="cvc" autoCorrect={false} value={this.state.cvc} onChangeText={(cvc) => this.setState({cvc})}/>
                              </View>
                          </View>
                          <View style={styles.slide}>
                              <View style={styles.card}>
                                  <Text style={styles.textNumber}>CARD TYPE</Text>
                                  <View style={{flexDirection: 'row'}}>
                                      {cardTypes.map((cardType) => {
                                          return (
                                              <TouchableOpacity key={cardType.type} onPress={() => this.setState({type: cardType.type})}>
                                                  <View>
                                                      <Image source={{uri: cardType.image}} style={{width: 57, height: 35, marginHorizontal: 5}} />
                                                  </View>
                                              </TouchableOpacity>
                                          );
                                      })}
                                  </View>
                              </View>
                          </View>
                      </Swiper>
                  </View>;
    }
    return (
        <ScrollView style={styles.container}>
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
    backgroundColor : '#fff',
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
        width: width,
        height: height
  },
  slide: {
       height: height,
       justifyContent: 'center',
       alignItems: 'center'
   },
  card: {
       marginHorizontal: 10,
       marginBottom: 30,
       backgroundColor: '#fff',
       borderRadius: 3,
       elevation: 3,
       borderBottomWidth: 1,
       borderRightWidth: 1,
       borderColor: '#ddd',
       padding: 10,
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
