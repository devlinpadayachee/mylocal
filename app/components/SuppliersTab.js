/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert,FlatList} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import SupplierListItem from './SupplierListItem';
import MapView from 'react-native-maps';
import firebaseApp from '../js/FirebaseApp';
export default class SuppliersTab extends Component {

  constructor(props) {
    super(props);
    this.suppliersRef = this.getRef().child('suppliers');
    this.state = {
      data : [],
    }
  }
  componentDidMount() {
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
      var suppliers = [];
      snap.forEach((child) => {
        suppliers.push({
          key: child.key,
          name: child.val().name
        });
      });
      this.setState({
        data: suppliers
      });
    });
  }



  renderSupplierItem = ({item}) => (
    <SupplierListItem id={item.key} item={item}/>
  );

  render() {
    return (

      <View style={styles.container}>
        <FlatList data={this.state.data} renderItem={this.renderSupplierItem}/>
      </View>

    );
  }


}

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
