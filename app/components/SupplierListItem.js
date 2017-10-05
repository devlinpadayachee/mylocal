import React, {Component} from 'react';
import ReactNative,{StyleSheet,Image,Alert} from 'react-native';
import { Container, Header, Title,Thumbnail, Content, Footer, List,ListItem,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
const { View, TouchableHighlight } = ReactNative;

class SupplierListItem extends Component {
  constructor(props) {
   super(props)
  }
  render() {
    return (

      <ListItem onPress={() => {Actions.productScreen({supplier_name:this.props.item.name,supplier_id:this.props.id})}}>
            <Thumbnail square size={35} source={require('../images/wallpaper.jpg')} />
            <Body>
              <Text style={styles.supplier_name}>{this.props.item.name}</Text>
              <Text note>Open</Text>
              <Text note>Location : 1km </Text>
            </Body>
            <Right>
              <Text note style={styles.view_text}>View</Text>
            </Right>
      </ListItem>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#fff',
  },
  supplier_name: {
    color : '#2c3e50',
    opacity : 1,
    fontWeight : '700'
  },
  view_text: {
    color : '#2980b9',
    opacity : 1,
    fontWeight : '700'
  },
});

module.exports = SupplierListItem;
