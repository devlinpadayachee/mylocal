/* @Boiler React Component */
'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions, Alert, ActivityIndicator,TouchableOpacity,Image,TextInput, StatusBar,Animated,Easing,AsyncStorage } from 'react-native';
import { Header,Footer,FooterTab,Container,Title,Tabs,Tab,TabHeading,Left,Right,Body, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapTab from './MapTab';
import SuppliersTab from './SuppliersTab';
import ProductsSearchTab from './ProductsSearchTab';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import arrowImg from '../images/left-arrow.png';
import firebaseApp from '../js/FirebaseApp';
import * as cart from '../js/Cart';
export default class ContainerScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      cart_item_count : null
    }
  }
  async componentDidMount() {
    this.setState({loading: true})
    console.log("Component Container Screen Mounted");
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,cart_item_count:cart_item_count})
  }
  componentWillUnmount() {
    console.log("Component Container Screen UnMounted");
  }
  async componentWillReceiveProps(nextProps){
    this.setState({loading: true})
    console.log(nextProps);
    let cart_item_count = await cart.getCartCount();
    this.setState({loading: false,cart_item_count:cart_item_count})
  }
  render() {

    const isLoading = this.state.loading

    let content = null;

    if (isLoading) {

        content = <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                  </View>
    }
    else {
        content = <View style={styles.container}>
                    <Tabs tabBarPosition="bottom" >
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-person-outline"  style={styles.icon}/></TabHeading>}>
                        <SuppliersTab/>
                      </Tab>
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-barcode-outline"  style={styles.icon}/></TabHeading>}>
                        <ProductsSearchTab/>
                      </Tab>
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-pin-outline"  style={styles.icon}/></TabHeading>}>
                        <MapTab/>
                      </Tab>
                    </Tabs>
                  </View>;
    }
    return (
      <Container >
        <Header hasTabs style={styles.header}>
          <Left style={styles.headerleft}>
            <Button transparent>
              <Icon name='ios-cog' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headertitle}>My Local </Title>
          </Body>
          <Right>
            <Button transparent  onPress={() => Actions.checkoutScreen()} >
              <Icon name='ios-cart'/>
              <Text style={{marginLeft : 10}}>
                {this.state.cart_item_count}
              </Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          {content}
        </View>
      </Container>
    );
  }
  _onPressButton = () => {
    console.log("Default Button Handler");
  }
  signout = () => {
    this.setState({
      loading: true
    });

  }
  //
  // // Go to the signup page
  // goToSignup(){
  //   this.props.navigator.push({
  //     component: Signup
  //   });
  // }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
  	flex : 1,
    backgroundColor : '#fff',
    justifyContent: 'center'
	},
  headertitle : {
    fontSize : 15,
  },
  header:{
    height : 70,
    backgroundColor : '#2c3e50',
  },
  headerleft:{
    maxWidth : 40
  },
  tab:{
    backgroundColor : '#2c3e50',
  }
});
