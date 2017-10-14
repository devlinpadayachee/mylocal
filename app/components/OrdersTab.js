/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,FlatList,ActivityIndicator} from 'react-native';
import { Container, Header, Card, CardItem,Title, Thumbnail,Content, Footer,ScrollableTab, Image,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import firebaseApp from '../js/FirebaseApp';
import Accordion  from 'react-native-accordion';
import Display from 'react-native-display';
import OrderListItem from './OrderListItem';
export default class OrdersTab extends Component {

  constructor(props) {
    super(props);
    this.ordersRef = this.getRef().child('orders');
    this.state = {
      data : [],
      isopen : false
    }
  }
  async componentDidMount() {
    console.log("Did Mount: Setting Initial State of Orders");
    this.listenForOrders(this.ordersRef);
  }
  componentWillUnmount() {
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForOrders(ordersRef) {
    ordersRef.on('value', (snap) => {
      // get children as an array
      let orders = [];


      snap.forEach((child) => {
        orders.push({
          key: child.key,
          buyer: child.val().buyer,
          cart : child.val().cart,
          cart_item_count : child.val().cart_item_count,
          cart_total : child.val().cart_total,
          createdAt : child.val().createdAt,
          status : child.val().status
        });
      });

      this.setState({
        data: orders,
      });
    });
  }



  renderOrderItem = ({item}) => (
    <OrderListItem key={item.key} id={item.key}  item={item}/>
  );


  render() {

    const isLoading = this.state.loading
    let suppliers_offering_delivery = this.state.suppliers_offering_delivery;
    let suppliers_offering_delivery_categories = this.state.suppliers_offering_delivery_categories;
    let suppliers = this.state.data;
    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }

    else {



        content = <View style={styles.container}>

                    <FlatList data={this.state.data} renderItem={this.renderOrderItem} keyExtractor={(item, index) => index}/>

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
    flex: 1,
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
  price_item : {
    alignSelf : 'center',
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 23,
    fontWeight : '500'
  }
});
