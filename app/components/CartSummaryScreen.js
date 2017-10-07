/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList,AsyncStorage } from 'react-native';
import { Header,Grid,Col,Container, Footer,FooterTab,Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import CartListItem from './CartListItem';
import * as cart from '../js/Cart';
var _ = require('lodash')
const SIZE = 40;
export default class CartSummaryScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
      cart_item_count : null,
      total : 0
    }
    this.growAnimated = new Animated.Value(0);
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
  render() {

    const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});

    const isLoading = this.state.loading;
    const cart_item_count = this.state.cart_item_count;

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
        content = <View style={styles.container}>
                      <FlatList data={this.state.data} renderItem={this.renderCartItem} keyExtractor={(item, index) => index}/>
                  </View>;
    }
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button transparent  onPress={() => Actions.pop()} >
              <Icon name='ios-arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headertitle}>Checkout</Title>
          </Body>
          <Right>
            <View>
              <Text style={styles.total_container}>R{this.state.total}</Text>
            </View>
          </Right>
        </Header>
        <Content>
          {content}
        </Content>
        {this.state.cart_item_count > 0 &&
          <Footer>
            <FooterTab>
              <Button  onPress={this.addtoCart} full success><Text style={styles.submitOrderButton}> Submit Order </Text></Button>
            </FooterTab>
          </Footer>
        }
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
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
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
