import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import ContainerScreen from './ContainerScreen';
import SignupScreen from './SignupScreen';
import ProductScreen from './ProductScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import CheckoutScreen from './CheckoutScreen';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	          component={LoginScreen}
	        	animation='bounce'
	          hideNavBar={true}
	          initial={true}
	        />
          <Scene key="containerScreen"
	          component={ContainerScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
          <Scene key="productScreen"
	          component={ProductScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
          <Scene key="productdetailsScreen"
	          component={ProductDetailsScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
          <Scene key="checkoutScreen"
	          component={CheckoutScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
	        <Scene key="signupScreen"
	          component={SignupScreen}
	          animation='bounce'
	          hideNavBar={true}
            title="Register"
	        />
	      </Scene>
	    </Router>
	  );
	}
}
