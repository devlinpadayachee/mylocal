import React, {Component} from 'react';
import ReactNative,{StyleSheet,Image,Alert} from 'react-native';
import { Container, Card,CardItem,Header, Title,Thumbnail, Content, Footer, List,ListItem,FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
import  moment  from 'moment';
const { View, TouchableHighlight } = ReactNative;

class OrderListItem extends Component {
  constructor(props) {
   super(props)
   this.state = {
     isopen : false
   }
  }

  changeOpenState = () => {
    console.log("Default Button Handler");
    this.setState({isopen: !this.state.isopen});
  }

  _onPressButton = () => {
    console.log("Default Button Handler");
  }

  render() {
    //console.log(this.props)
    let item= this.props.item;
    let createdAt =  moment(this.createdAt).format('YYYY-MM-DD');
    let featureslist = item.cart.map(function(cartitem, index , arr){

      if (arr.length - 1 === index) {
      return <ListItem key={index} last style={{justifyContent :'space-between'}}>
                    <Text style={styles.details_muted}>{cartitem.product.name}</Text>
                    <Text style={styles.details_muted_green}> ({cartitem.quantity})</Text>
                    <Text style={styles.details_muted}>R{cartitem.total}</Text>
             </ListItem>
      } else{
        return <ListItem key={index} style={{justifyContent :'space-between'}}>
                    <Text style={styles.details_muted}>{cartitem.product.name}</Text>
                    <Text style={styles.details_muted_green}> ({cartitem.quantity})</Text>
                    <Text style={styles.details_muted}>R{cartitem.total}</Text>
               </ListItem>
      }
    })

    return (
                  <Card style={styles.card}>
                  <CardItem>


                      <Body>
                        <Text style={styles.order_name}>{item.key}</Text>
                        <Text style={styles.details_muted_green}>{item.cart_item_count} Cart Items</Text>
                      </Body>

                  </CardItem>


                  <CardItem style={{alignItems:'center'}}>


                      <Body style={{alignItems:'center'}}>
                        <Text style={styles.price_item}>R {item.cart_total}</Text>
                        <Text style={styles.price_item}>{item.status}</Text>
                      </Body>

                  </CardItem>

                  <CardItem>
                    <Left>
                      <Button transparent onPress={this.changeOpenState}>
                        <Display enable={this.state.isopen}>
                          <Text>Less Details</Text>
                        </Display>
                        <Display enable={!this.state.isopen}>
                          <Text>More Details</Text>
                        </Display>
                      </Button>
                    </Left>
                    <Right>
                      <Text style={styles.details_muted_green}>{createdAt}</Text>
                    </Right>
                  </CardItem>
                  <Display enable={this.state.isopen}>


                      <List style={styles.feature_list}>
                        {featureslist}
                      </List>


                  </Display>
                </Card>


    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feature_list : {
    flex : 1,
    alignItems : 'stretch',
    alignSelf : 'stretch'
  },
  order_name: {
    color : '#2c3e50',
    opacity : 1,
    fontSize : 13,
    fontWeight : '700'
  },
  price_item : {
    alignSelf : 'center',
    color : '#2c3e50',
    opacity : 0.9,
    fontSize : 23,
    fontWeight : '500'
  },
  details_muted: {
    color : '#fff',
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
  },
  card : {
    backgroundColor : '#2980b9',
  }
});

module.exports = OrderListItem;
