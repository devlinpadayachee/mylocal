/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,Switch,AsyncStorage, View, Dimensions, Alert,Slider, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList } from 'react-native';
import { Header,Container,Grid,Col,Card,CardItem, H1,Title,Item as FormItem,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button,Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
const Item = Picker.Item;
var _ = require('lodash')
const SIZE = 40;
export default class ProductDetailsScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      total_value: this.props.product.price,
      quantity_value: 1,
      cart_item_count: null
    }
    this.growAnimated = new Animated.Value(0);
  }
  componentDidMount() {
    console.log(this.props.product)
    this.setCartCountSync();
    console.log("Product Details Screen Mounted");
  }
  componentWillUnmount() {
    console.log("Product Details Screen UnMounted");
  }

  render() {

    const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});

    const isLoading = this.state.loading

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else {
        content = <Content style={styles.container}>
                    <Header hasTabs style={styles.header}>
                      <Left>
                        <Button transparent  onPress={() => Actions.pop()} >
                          <Icon name='ios-arrow-back'/>
                        </Button>
                      </Left>
                      <Body>
                        <Title style={styles.headertitle}>Product Details</Title>
                      </Body>
                      <Right>
                        <Button transparent  onPress={() => Actions.checkoutScreen()} >
                          <Icon name='ios-cart'/>
                          <Text style={{marginLeft : 10}}>
                            {this.state.cart_item_count}
                          </Text>
                        </Button>
                      </Right>
                    </Header>
                    <View style={styles.product_details_section}>

                      <Image style={styles.picture} source={{uri : this.props.product.imageUrl}}/>

                    </View>
                    <Card style={styles.card_header}>
                        <CardItem style={styles.card_header} header>
                          <Text uppercase={true} style={styles.product_title}>{this.props.product.name}</Text>
                        </CardItem>
                        <CardItem style={styles.card_item}>
                          <Body>

                          </Body>
                        </CardItem>
                        <CardItem footer>

                        </CardItem>
                    </Card>
                    <Card style={styles.card_header}>
                      <CardItem style={styles.card_header} header>
                        <Text style={styles.product_title}>ORDER THIS ITEM</Text>
                      </CardItem>
                      <CardItem style={styles.card_item}>
                        <Body>
                            <Grid>
                              <Col style={styles.col_details}>
                                <Text style={styles.col_header_text} >
                                Cost/Unit
                                </Text>
                                <Text style={styles.col_default_text}>
                                  R{this.props.product.price}
                                </Text>
                              </Col>
                              <Col style={styles.col_details}>
                                <Text style={styles.col_header_text} >
                                Quantity
                                </Text>
                                <Text style={styles.col_default_text} >
                                  {this.state.quantity_value && +this.state.quantity_value.toFixed(0)}
                                </Text>
                              </Col>
                              <Col style={styles.col_details}>
                                <Text style={styles.col_header_text} >
                                Total Cost
                                </Text>
                                <Text style={styles.col_default_text}>
                                  R{this.state.total_value.toFixed(0)}
                                </Text>
                              </Col>
                            </Grid>
                          <Slider
                                  minimumTrackTintColor={'#2c3e50'}
                                  minimumValue={1}
                                  step={1}
                                  maximumValue={10}
                                  style={styles.slider}
                                  onValueChange={(value) => this.setState({quantity_value: value,total_value:this.props.product.price*value})}
                          >

                          </Slider>
                          <Button onPress={this.addtoCart} full success><Text> Add to Cart </Text></Button>
                        </Body>
                      </CardItem>
                      <CardItem footer>

                      </CardItem>
                   </Card>
                  </Content>;
    }
    return (
      <Content style={styles.container}>
        {content}
      </Content>
    );
  }

 getCart = async () => {
   console.log("Getting Cart");
   let current_cart = JSON.parse(await AsyncStorage.getItem('cart'));
   return current_cart;
 }

 getCartCount = async () => {
   console.log("Getting Cart Count");
   let current_cart = JSON.parse(await AsyncStorage.getItem('cart'));
   return current_cart.length;
 }

 setCartCountSync = () => {
   console.log("Getting Sync Cart Count");
   AsyncStorage.getItem('cart').then((cart) => {
     let current_cart = JSON.parse(cart);
     this.setState({cart_item_count: current_cart.length});
     return current_cart.length;
   });
 }

setCart = async (cart) => {

    console.log("Setting Cart");
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      return true
    } catch (error) {
      return false
    }
}

 addtoCart = async () => {
    try {
      Alert.alert("Thank you", "Added item to cart");
      let current_cart = await this.getCart();
      current_cart.push({product:this.props.product,quantity:this.state.quantity_value,total:this.state.total_value});

      await this.setCart(current_cart);

      console.log(await AsyncStorage.getItem('cart'));
      console.log(current_cart.length);

      await AsyncStorage.setItem('cart_item_count', JSON.stringify(current_cart.length));
      this.setState({cart_item_count: current_cart.length});



    } catch (error) {
      console.log("Error Setting Cart Data!" + error);
    }
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
  	flex : 1,
    backgroundColor : '#fff'
	},
  slider: {
    height: 25,
    width : DEVICE_WIDTH-50,
    marginTop: 10,
    marginBottom: 10,
  },
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
  },
  headertitle : {
    fontSize : 15,
  },
  card_item : {
    backgroundColor: 'transparent'
  },
  card_header : {
    backgroundColor: 'transparent',
    alignItems : 'center'
  },
  card : {
    backgroundColor : '#fff',
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
  product_details_section : {
    alignItems : 'center'
  },
  product_title: {
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 15,
    marginTop : 5,
    marginBottom : 5,
    fontWeight : '700',
    textAlign : 'center',
  },
  product_details_muted: {
    opacity : 0.9,
    fontSize : 12,
    color : '#27ae60',
    fontWeight : '400'
  },
  picture: {
    marginTop : 20,
		width: 200,
		height: 200,
    alignItems : 'center',
    justifyContent : 'center'
	},
  thumbnail: {
    backgroundColor : '#2980b9',
  },
  icon: {
    color : '#2980b9',
    opacity : 1,
    fontSize : 35,
    fontWeight : '900'
  }
});
