/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,FlatList,ActivityIndicator} from 'react-native';
import { Container, Header, Title, Content, Footer,ScrollableTab, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import SupplierListItem from './SupplierListItem';
import MapView from 'react-native-maps';
import firebaseApp from '../js/FirebaseApp';
export default class SuppliersTab extends Component {

  constructor(props) {
    super(props);
    this.suppliersRef = this.getRef().child('suppliers');
    this.state = {
      data : [],
      suppliers_offering_delivery : [],
      suppliers_offering_delivery_categories : [],
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
      suppliers_offering_delivery_categories = _.keys(suppliers_offering_delivery);
      console.log(suppliers_offering_delivery)
      console.log(suppliers_offering_delivery_categories)
      this.setState({
        data: suppliers,
        suppliers_offering_delivery : suppliers_offering_delivery,
        suppliers_offering_delivery_categories : suppliers_offering_delivery_categories
      });
    });
  }


  renderSupplierItem = ({item}) => (
    <SupplierListItem id={item.key} item={item}/>
  );


  render() {

    const isLoading = this.state.loading
    let suppliers_offering_delivery = this.state.suppliers_offering_delivery;
    let suppliers_offering_delivery_categories = this.state.suppliers_offering_delivery_categories;
    console.log(suppliers_offering_delivery_categories)
    let suppliers = this.state.data;
    console.log("Will now try to render suppliers tab");
    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }

    else {

      content = <View style={styles.container}>
                  <ActivityIndicator size="large"/>
                </View>
        let supplierlist = suppliers_offering_delivery_categories.map(function(offering_delivery_category, index){

            console.log(offering_delivery_category);

            renderSupplierItem = ({item}) => (
              <SupplierListItem id={item.key} item={item}/>
            );
            // let categoryheading = category.toUpperCase();
            if (offering_delivery_category == "yes")
            {
              return <Tab tabStyle={styles.scrollabletab} activeTabStyle={styles.activescrollabletab} heading="DELIVERY">
                        <FlatList data={suppliers_offering_delivery[offering_delivery_category]} renderItem={renderSupplierItem} keyExtractor={(item, index) => index}/>
                     </Tab>

            }
        })


        content = <View style={styles.container}>

                    <Tabs renderTabBar={()=> <ScrollableTab />}>
                      {supplierlist}
                      <Tab tabStyle={styles.scrollabletab} activeTabStyle={styles.activescrollabletab} heading="PICKUP">
                                <FlatList data={this.state.data} renderItem={this.renderSupplierItem} keyExtractor={(item, index) => index}/>
                      </Tab>

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
  }
});
