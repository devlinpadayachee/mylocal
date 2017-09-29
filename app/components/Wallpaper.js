/* @Boiler React Component */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert, Image} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import bgSrc from '../images/wallpaper.jpg';

export default class Wallpaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    console.log("Component did mount");
  }
  componentWillUnmount() {
    console.log("Component will unmount");
  }
  render() {
    return (
      <Image style={styles.picture} source={bgSrc}>
  				{this.props.children}
  		</Image>
    );
  }
  _onPressButton = () => {
    console.log("Default Button Handler");
  }
}

const styles = StyleSheet.create({
  picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	}
});
