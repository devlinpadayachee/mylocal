import React, {Component} from 'react';
import ReactNative,{StyleSheet,Image,Alert} from 'react-native';
import { Container, Header, Title,Thumbnail, Content, Footer, List,ListItem,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
const { View, TouchableHighlight } = ReactNative;

class ProductListItem extends Component {
  constructor(props) {
   super(props)
  }
  render() {
    //console.log(this.props)
    return (

      <ListItem key={this.props.id} onPress={() => {Actions.productdetailsScreen({product:this.props.item})}}>
            <Thumbnail square size={40} source={{uri : this.props.item.imageUrl}} style={styles.thumbnail}/>
            <Body>
              <Text style={styles.product_name}>{this.props.item.name}</Text>
              <Text style={styles.details_muted}>Item Code: {this.props.id}</Text>
              <Text style={styles.details_muted}>Supplier Code: {this.props.item.supplier_sku}</Text>
              <Text style={styles.details_muted_green}>In Stock</Text>

              <Text style={styles.details_muted}>Price: R{this.props.item.price} </Text>
            </Body>
            <Right>
              <Icon name='ios-add' style={styles.icon}/>
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
    opacity : 1,
    fontSize : 13,
    fontWeight : '700'
  },
  details_muted: {
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 12,
    fontWeight : '400'
  },
  details_muted_green: {
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

module.exports = ProductListItem;
