/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList,AsyncStorage } from 'react-native';
import { Header,Container, Footer,FooterTab,Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import CartListItem from './CartListItem';
var _ = require('lodash')
const SIZE = 40;
export default class CheckoutScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
      total : 0
    }
    this.growAnimated = new Animated.Value(0);
  }
  async componentDidMount() {
    this.setState({loading: true})
    console.log("Checkout Screen Mounted");
    let current_cart = await this.getCart();
    let total = _.sumBy(current_cart, 'total');
    this.setState({loading: false,data:current_cart,total:total})
  }
  componentWillUnmount() {
    console.log("Checkout Screen UnMounted");
  }

  renderCartItem = ({item}) => (
    <CartListItem key={item.product.key} item={item}/>
  );
  render() {

    const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});

    const isLoading = this.state.loading

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large" style={{marginTop: 100}}/>
                  </View>
    }
    else {
        content = <View style={styles.container}>

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

                    <View style={styles.container}>
                      <FlatList data={this.state.data} renderItem={this.renderCartItem}/>
                    </View>

                    <Footer>
                      <FooterTab>
                        <Button onPress={this.addtoCart} full success><Text> Submit Order </Text></Button>
                      </FooterTab>
                    </Footer>
                  </View>;
    }
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }

  getCart = async () => {
    console.log("Getting Cart");
    let current_cart = JSON.parse(await AsyncStorage.getItem('cart'));
    return current_cart;
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
  	flex : 1,
    backgroundColor : '#fff'
	},
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
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
});
