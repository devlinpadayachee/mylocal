/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList } from 'react-native';
import { Header,Container, Grid,Col,Title,Tabs,Tab,TabHeading,ScrollableTab ,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import ProductListItem from './ProductListItem';
import * as cart from '../js/Cart';
var _ = require('lodash')
const SIZE = 40;
export default class ProductScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
      products_by_category : [],
      categories : [],
      cart_item_count : null
    }
    this.productsRef = this.getRef().child('suppliersCatalogue/'+this.props.supplier_id);
    this.growAnimated = new Animated.Value(0);
  }
  async componentDidMount() {
    this.setState({loading: true})
    console.log("Product Container Screen Mounted");
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,cart_item_count:cart_item_count})
    this.listenForProducts(this.productsRef);
  }
  componentWillUnmount() {
    console.log("Product Container Screen UnMounted");
  }
  async componentWillReceiveProps(nextProps){
    this.setState({loading: true})
    console.log(nextProps);
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,cart_item_count:cart_item_count})
  }
  getRef() {
    return firebaseApp.database().ref();
  }
  listenForProducts(productsRef) {
    productsRef.on('value', (snap) => {
      // get children as an array
      console.log("Loading Products for Supplier:" + this.props.supplier_id)
      let products = [];
      let products_by_category = [];
      let categories = [];

      snap.forEach((child) => {
        products.push({
          key: child.key,
          name: child.val().name,
          price : child.val().price,
          imageUrl : child.val().imageUrl,
          category : child.val().category,
          features : child.val().features,
          description : child.val().description,
          supplier_sku : child.val().supplier_sku,
        });
      });

      products_by_category = _.groupBy(products, product => product.category);
      categories = _.keys(products_by_category);
      console.log(products);
      console.log(categories);

      this.setState({
        data: products,
        products_by_category : products_by_category,
        categories : categories
      });
    });
  }
  renderProductItem = ({item}) => (
    <ProductListItem key={item.key} id={item.key}  item={item}/>
  );
  render() {

    const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});

    const isLoading = this.state.loading
    let products_by_category = this.state.products_by_category;
    let categories = this.state.categories;
    console.log("Will now try to render products_by_category var");
    // console.log(products_by_category)
    let content = null;
    console.log(this.state.data.length)
    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else if (this.state.data.length == 0) {
        console.log("setting no product")
        content = <View style={styles.container}>
                    <Grid>
                      <Col style={styles.col_details}>
                        <Text style={styles.col_header_text} >
                          This Supplier does not have any items loaded
                        </Text>
                        <Text style={styles.col_default_text}>
                          Please return to the supplier list and try again
                        </Text>
                      </Col>
                    </Grid>
                  </View>
    }
    else {

        let tablist = categories.map(function(category, index){

            let renderProductItem = ({item}) => {
              console.log(item);
              return (
                  <ProductListItem key={item.key} id={item.key} item={item}/>
                )
            };
            // let categoryheading = category.toUpperCase();
            return <Tab tabStyle={styles.scrollabletab} textStyle={styles.textStyle} activeTabStyle={styles.activescrollabletab} heading={category.toUpperCase()} key={index}>
                      <FlatList data={products_by_category[category]} renderItem={renderProductItem} keyExtractor={(item, index) => item.key}/>
                   </Tab>
        })

        content = <View>

                    <Tabs renderTabBar={()=> <ScrollableTab />}>
                      {tablist}
                    </Tabs>

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
            <Title style={styles.headertitle}>{this.props.supplier_name}</Title>
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
      </Container>
    );
  }
  _onPressButton = () => {
    console.log("Default Button Handler");
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
  headerleft:{
    maxWidth : 40
  },
  headertitle : {
    fontSize : 15,
  },
  activescrollabletab : {
    flex : 1,
    backgroundColor : '#2c3e50',
    opacity : 0.9
  },
  scrollabletab : {
    flex : 1,
    backgroundColor : '#2c3e50',
    opacity : 0.8,
  },
  textStyle: {
    color : '#fff',
    fontSize : 12,
    fontWeight : '700'
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
