import React, {Component} from 'react';
import ReactNative,{StyleSheet,Image,Alert} from 'react-native';
import { Container, Header, Title,Thumbnail, Content, Footer, List,ListItem,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import  moment  from 'moment';
const { View, TouchableHighlight } = ReactNative;

class SupplierListItem extends Component {
  constructor(props) {
   super(props)
  }
  render() {

    let current_time =  moment();
    let supplier_opening_time = moment(this.props.item.opens+":"+this.props.item.opensMins,"HH:mm A");
    let supplier_closing_time = moment(this.props.item.closes+":"+this.props.item.closesMins,"HH:mm A");
    let item_border_color  = null;
    let open_closed_color  = null;
    if (current_time.isBetween(supplier_opening_time, supplier_closing_time)) {
      item_border_color = '#27ae60';
      open_closed_color = '#27ae60';
      open_closed_text = "Open";

    } else {
      item_border_color = '#c0392b';
      open_closed_color = '#c0392b';
      open_closed_text = "Closed";
    }

    return (

      <ListItem key={this.props.id} style={{borderRightWidth: 7,borderRightColor:item_border_color}} onPress={() => {Actions.productScreen({supplier_name:this.props.item.name,supplier_id:this.props.id})}}>
            <Thumbnail square size={35} source={require('../images/wallpaper.jpg')} />
            <Body>
              <Text style={styles.supplier_name}>{this.props.item.name}</Text>
              <Text style={styles.details_muted}>{supplier_opening_time.format('HH:mm')} - {supplier_closing_time.format('HH:mm')}</Text>
              <Text note style={{color:item_border_color,fontSize:12,opacity:0.9,fontWeight:'400'}}>{open_closed_text}</Text>
              <Text style={styles.details_muted}>Location : 1km </Text>
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
  view_text: {
    color : '#2980b9',
    opacity : 1,
    fontWeight : '700'
  },
});

module.exports = SupplierListItem;
