/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList } from 'react-native';
import { Header,Container, Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import ProductListItem from './ProductListItem';
var _ = require('lodash')
const SIZE = 40;
export default class ProductScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
    }
    this.productsRef = this.getRef().child('suppliersCatalogue/'+this.props.supplier_id);
    this.growAnimated = new Animated.Value(0);
  }
  componentDidMount() {
    console.log("Product Container Screen Mounted");
    this.listenForProducts(this.productsRef);
  }
  componentWillUnmount() {
    console.log("Product Container Screen UnMounted");
  }
  getRef() {
    return firebaseApp.database().ref();
  }
  listenForProducts(productsRef) {
    productsRef.on('value', (snap) => {
      // get children as an array
      console.log("Loading Products for Supplier:" + this.props.supplier_id)
      var products = [];
      snap.forEach((child) => {
        products.push({
          key: child.key,
          name: child.val().name,
          price : child.val().price,
          imageUrl : child.val().imageUrl,
          category : child.val().category,
        });
      });
      this.setState({
        data: products
      });
    });
  }
  renderProductItem = ({item}) => (
    <ProductListItem id={item.key} item={item}/>
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
                    <ActivityIndicator size="large"/>
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
                        <Title style={styles.headertitle}>{this.props.supplier_name}</Title>
                      </Body>
                      <Right/>
                    </Header>
                    <View style={styles.container}>
                      <FlatList data={this.state.data} renderItem={this.renderProductItem}/>
                    </View>
                  </View>;
    }
    return (
      <View style={styles.container}>
        {content}
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
  }
});
