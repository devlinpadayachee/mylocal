/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,FlatList } from 'react-native';
import { Header,Container, Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../js/FirebaseApp';
import ProductListItem from './ProductListItem';
import Autocomplete from 'react-native-autocomplete-input';
var _ = require('lodash')
export default class ProductsSearchTab extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data : [],
      query: ''
    }
    this.productsRef = this.getRef().child('products');
  }
  componentDidMount() {
    console.log("Did Mount: Setting Initial State of Product Search");
    this.listenForProducts(this.productsRef);
  }
  componentWillUnmount() {
    console.log("Product Search Screen UnMounted");
  }
  getRef() {
    return firebaseApp.database().ref();
  }
  listenForProducts(productsRef) {
    productsRef.on('value', (snap) => {
      // get children as an array
      var products = [];
      snap.forEach((child) => {
        products.push({
          key: child.key,
          name: child.val().name,
          price : child.val().price,
          imageUrl : child.val().imageUrl,
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

  _filterData(query) {
    if (query === '') {
      return [];
    }

    const products = this.state.data;

    var results = _.filter(products,function(obj) {
      return obj.name.indexOf(query) !== -1;
    });
    return results;
  }

  render() {


    const isLoading = this.state.loading
    const query = this.state.query;
    const data = this._filterData(query)
    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else {
        content = <View style={styles.autocompleteContainer}>
                      <Autocomplete
                        containerStyle={styles.autocompleteContainer}
                        placeholder="Search for a Product"
                        onChangeText={text => this.setState({ query: text })}
                        data={data}
                        renderItem={data => (
                          <TouchableOpacity onPress={() => this.setState({ query: data.name })}>
                            <Text>{data.name}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <FlatList style= {styles.listContainer} data={this.state.data} renderItem={this.renderProductItem}/>
                  </View>;
    }
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }


}

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
  	flex : 1,
    backgroundColor : '#fff'
	},
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
  },
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  listContainer: {
    paddingTop: 40
  },
  headertitle : {
    fontSize : 15,
  }
});
