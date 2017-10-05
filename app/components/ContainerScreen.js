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
const SIZE = 40;
export default class ContainerScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
    this.growAnimated = new Animated.Value(0);
  }
  componentDidMount() {
    console.log("Component Container Screen Mounted");
  }
  componentWillUnmount() {
    console.log("Component Container Screen UnMounted");
  }
  render() {

    const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});

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
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-person-outline"  style={styles.icon}/><Text>Suppliers</Text></TabHeading>}>
                        <SuppliersTab/>
                      </Tab>
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-barcode-outline"  style={styles.icon}/><Text>Products</Text></TabHeading>}>
                        <ProductsSearchTab/>
                      </Tab>
                      <Tab heading={ <TabHeading style= {styles.tab}><Icon name="ios-pin-outline"  style={styles.icon}/><Text>Near Me</Text></TabHeading>}>
                        <MapTab/>
                      </Tab>
                    </Tabs>
                  </View>;
    }
    return (
      <Container >
        <Header hasTabs style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='ios-cog' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headertitle}>My Local </Title>
          </Body>
          <Right/>
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
  tab:{
    backgroundColor : '#2c3e50',
  }
});
