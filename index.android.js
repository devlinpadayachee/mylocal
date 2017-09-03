/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry,  StyleSheet,  View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Tab, Tabs, TabHeading, Root } from 'native-base';
import MapTab from './app/components/MapTab';
import Icon from 'react-native-vector-icons/Ionicons';
export default class mylocal extends Component {
  render() {
    return (
      <Root>
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='ios-cog' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title>Find My Local </Title>
          </Body>

        </Header>
        <Tabs tabBarPosition="bottom">
          <Tab heading={ <TabHeading><Icon name="ios-pin-outline"  style={styles.icon}/><Text>Find Suppliers</Text></TabHeading>}>
            <MapTab/>
          </Tab>
          <Tab heading={ <TabHeading><Icon name="ios-cart-outline"  style={styles.icon}/><Text>Orders</Text></TabHeading>}>

          </Tab>
        </Tabs>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    // backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mylocal', () => mylocal);
