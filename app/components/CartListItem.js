import React, {Component} from 'react';
import ReactNative,{StyleSheet,Image,Alert} from 'react-native';
import { Container, Header, Title,Thumbnail, Content, Footer, List,ListItem,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
const { View, TouchableHighlight } = ReactNative;

class CartListItem extends Component {
  constructor(props) {
   super(props)
  }
  render() {
    console.log(this.props)
    return (

      <ListItem onPress={() => {Actions.productdetailsScreen({product:this.props.item.product})}}>
            <Thumbnail square size={40} source={{uri : this.props.item.product.imageUrl}} style={styles.thumbnail}/>
            <Body>
              <Text style={styles.product_name}>{this.props.item.product.name}</Text>
              <Text style={styles.product_details_muted}>Quantity: {this.props.item.quantity} </Text>
              <Text style={styles.product_name}>Price: R{this.props.item.product.price} per unit </Text>
              <Text style={styles.product_name}>Total: R{this.props.item.total} ({this.props.item.quantity}) </Text>
            </Body>
            <Right>
              <Icon name='ios-remove' style={styles.icon}/>
            </Right>
      </ListItem>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  product_name: {
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 12,
    fontWeight : '400'
  },
  product_details_muted: {
    opacity : 0.9,
    fontSize : 12,
    color : '#27ae60',
    fontWeight : '400'
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

module.exports = CartListItem;
