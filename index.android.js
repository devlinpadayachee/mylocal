/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,  StyleSheet,  View,StatusBar } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Tab, Tabs, TabHeading, Root } from 'native-base';
import MapTab from './app/components/MapTab';
import Main from './app/components/Main';
import Icon from 'react-native-vector-icons/Ionicons';
console.ignoredYellowBox = [
    'Setting a timer'
]
export default class mylocal extends Component {
  render() {
    return (
      <Root style={styles.container}>
          <StatusBar
             backgroundColor="#2c3e50"
          />
          <Main />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:"#2c3e50"
  }
});

AppRegistry.registerComponent('mylocal', () => mylocal);
