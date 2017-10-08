/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,Switch,AsyncStorage, View, Dimensions, Alert,Slider, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList } from 'react-native';
import { Header,H2,H3,Footer,FooterTab,Container,Grid,Col,Card,CardItem, H1,Title,Item as FormItem,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button,Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
const Item = Picker.Item;
import * as cart from '../js/Cart';
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
    console.log("Constructed")
    this.growAnimated = new Animated.Value(0);
  }
  async componentDidMount() {
    this.setState({loading: true})
    console.log("Product Details Screen Mounted");
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,cart_item_count:cart_item_count})
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
    let product_features = this.props.product.features;
    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else {

        let featureslist = product_features.map(function(feature, index , arr){

          if (arr.length - 1 === index) {
          return <ListItem key={index} last>
                      <Text style={styles.col_default_text}>{feature}</Text>
                 </ListItem>
          } else{
            return <ListItem key={index} >
                        <Text style={styles.col_default_text}>{feature}</Text>
                   </ListItem>
          }
        })

        content = <View style={styles.container}>
                    <View style={styles.product_details_section}>
                      <Image style={styles.picture} source={{uri : this.props.product.imageUrl}}/>
                    </View>
                    <Text uppercase={true} style={styles.product_title}>{this.props.product.name}</Text>
                    <Text style={styles.product_description}>{this.props.product.description}</Text>
                    <List style={styles.feature_list}>
                      {featureslist}
                    </List>
                    <Card style={styles.card_header}>
                      <CardItem style={styles.card_header} header>
                        <Text style={styles.product_title}>CUSTOMIZE YOUR ORDER</Text>
                      </CardItem>
                      <CardItem style={styles.card_item}>
                        <Body style={styles.slidercontainer}>
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
                            <View style={styles.slidercontainer}>
                              <Slider
                                      minimumTrackTintColor={'#2c3e50'}
                                      minimumValue={1}
                                      step={1}
                                      maximumValue={10}
                                      style={styles.slider}
                                      onValueChange={(value) => this.setState({quantity_value: value,total_value:this.props.product.price*value})}
                              >

                              </Slider>
                            </View>
                        </Body>
                      </CardItem>
                   </Card>
                  </View>;
    }
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left style={styles.headerleft}>
            <Button transparent  onPress={() => Actions.pop({refresh:{test:Math.random()}})} >
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
        <Content>
          {content}
        </Content>
        <Footer>
          <FooterTab>
            <Button  onPress={this.addtoCart} full success><Text style={styles.addtocartButton}> Add to cart </Text></Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }



 addtoCart = async () => {
    try {
      Alert.alert("Thank you", "Added item to cart");
      let current_cart = await cart.getCart();
      current_cart.push({product:this.props.product,quantity:this.state.quantity_value,total:this.state.total_value});
      await cart.setCart(current_cart);
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
    backgroundColor : '#fff',
    justifyContent: 'center'
	},
  feature_list : {
    alignItems : 'stretch',
    alignSelf : 'stretch'
  },
  addtocartButton : {
    color : '#fff',
    fontSize : 15,
  },
  slider: {
    height: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  slidercontainer: {
    alignItems : 'stretch',
    marginTop: 10,
    backgroundColor : '#ecf0f1',
    justifyContent: 'center',
    marginBottom: 10,
  },
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
  },
  headerleft:{
    maxWidth : 40
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
    fontSize : 18,
    marginTop : 5,
    marginBottom : 5,
    fontWeight : '700',
    textAlign : 'center',
  },
  product_description: {
    color : '#2980b9',
    opacity : 0.9,
    fontSize : 13,
    marginTop : 5,
    marginBottom : 5,
    fontWeight : '300',
    textAlign : 'center',
  },
  product_details_muted: {
    opacity : 0.9,
    fontSize : 12,
    color : '#27ae60'
  },
  picture: {
    marginTop : 20,
		width: 150,
		height: 150,
    alignItems : 'center',
    justifyContent : 'center'
	},
  thumbnail: {
    backgroundColor : '#2980b9',
  },
  icon: {
    color : '#2980b9',
    opacity : 1,
    fontSize : 30,
    fontWeight : '900'
  }
});
