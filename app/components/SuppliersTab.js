/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,FlatList,ActivityIndicator} from 'react-native';
import { Container, Header, Title, Content, Footer,ScrollableTab, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import SupplierListItem from './SupplierListItem';
import firebaseApp from '../js/FirebaseApp';
export default class SuppliersTab extends Component {

  constructor(props) {
    super(props);
    this.suppliersRef = this.getRef().child('suppliers');
    this.state = {
      data : [],
      suppliers_offering_delivery : [],
      suppliers_offering_delivery_categories : [],
      suppliers_offering_services : []
    }
  }
  async componentDidMount() {
    console.log("Did Mount: Setting Initial State of Suppliers");
    this.listenForSuppliers(this.suppliersRef);
  }
  componentWillUnmount() {
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForSuppliers(suppliersRef) {
    suppliersRef.on('value', (snap) => {
      // get children as an array
      let suppliers = [];
      let suppliers_offering_delivery = [];
      let suppliers_offering_delivery_categories = [];
      let suppliers_offering_pickup = [];

      snap.forEach((child) => {
        suppliers.push({
          key: child.key,
          name: child.val().name,
          offeringDelivery : child.val().offeringDelivery,
          opens : child.val().opens,
          closes : child.val().closes,
          opensMins : child.val().opensMins,
          closesMins : child.val().closesMins,
        });
      });

      suppliers_offering_delivery = _.groupBy(suppliers, supplier => supplier.offeringDelivery);
      console.log(suppliers_offering_delivery)
      suppliers_offering_delivery_categories = _.keys(suppliers_offering_delivery);
      suppliers_offering_pickup = _.filter(suppliers,function(n) {return n.offeringDelivery != 'service';});
      console.log(suppliers_offering_pickup)
      this.setState({
        data: suppliers,
        suppliers_offering_delivery : suppliers_offering_delivery,
        suppliers_offering_delivery_categories : suppliers_offering_delivery_categories,
        suppliers_offering_pickup : suppliers_offering_pickup
      });
    });
  }


  renderSupplierItem = ({item}) => (
      <SupplierListItem key={item.key} id={item.key} item={item}/>
  );


  render() {

    const isLoading = this.state.loading
    let suppliers_offering_delivery = this.state.suppliers_offering_delivery;
    let suppliers_offering_delivery_categories = this.state.suppliers_offering_delivery_categories;
    let suppliers_offering_pickup = this.state.suppliers_offering_pickup;
    let suppliers = this.state.data;
    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }

    else {

        let supplierlist = suppliers_offering_delivery_categories.map(function(offering_delivery_category, index){

            renderSupplierItem = ({item}) => (
              <SupplierListItem key={item.key} id={item.key} item={item}/>
            );
            // let categoryheading = category.toUpperCase();
            if (offering_delivery_category == "yes")
            {
              return <Tab tabStyle={styles.scrollabletab} activeTextStyle={styles.activetextStyle} textStyle={styles.textStyle} activeTabStyle={styles.activescrollabletab} heading="DELIVERY" key={index}>
                        <FlatList data={suppliers_offering_delivery[offering_delivery_category]} renderItem={renderSupplierItem} keyExtractor={(item, index) => item.key}/>
                     </Tab>

            }
        })

        let serviceslist = suppliers_offering_delivery_categories.map(function(offering_delivery_category, index){

            renderSupplierItem = ({item}) => (
              <SupplierListItem key={item.key} id={item.key} item={item}/>
            );
            // let categoryheading = category.toUpperCase();
            if (offering_delivery_category == "service")
            {
              return <Tab tabStyle={styles.scrollabletab} activeTextStyle={styles.activetextStyle} textStyle={styles.textStyle} activeTabStyle={styles.activescrollabletab} heading="SERVICES" key={index}>
                        <FlatList data={suppliers_offering_delivery[offering_delivery_category]} renderItem={renderSupplierItem} keyExtractor={(item, index) => item.key}/>
                     </Tab>

            }
        })


        content = <View style={styles.container}>

                    <Tabs renderTabBar={()=> <ScrollableTab />}>
                      {supplierlist}
                      <Tab tabStyle={styles.scrollabletab} activeTextStyle={styles.activetextStyle} textStyle={styles.textStyle} activeTabStyle={styles.activescrollabletab} heading="PICKUP">
                                <FlatList data={this.state.suppliers_offering_pickup} renderItem={this.renderSupplierItem} keyExtractor={(item, index) => index}/>
                      </Tab>
                      {serviceslist}
                    </Tabs>

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
  activetextStyle : {
    color : '#fff',
    fontSize : 13,
    fontWeight : '700'
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
