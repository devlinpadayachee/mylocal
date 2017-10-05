import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Tab, Tabs, TabHeading, Fab,Toast } from 'native-base';
import MapView from 'react-native-maps';
export default class MapTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      userlocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      error: null
    }
  }
  // getInitialState() {
  //   return {
  //     active: 'true',
  //     region: {
  //       latitude: 0,
  //       longitude: 0,
  //       latitudeDelta: 0,
  //       longitudeDelta: 0,
  //     },
  //     userlocation: {
  //       latitude: 0,
  //       longitude: 0,
  //       latitudeDelta: 0,
  //       longitudeDelta: 0,
  //     },
  //     error: null
  //   };
  // }
  componentDidMount() {
    console.log("Did Mount: Setting Initial State of Map")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.000,
            longitudeDelta: 0.0121,
          },
          userlocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.000,
            longitudeDelta:  0.0121,
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000, distanceFilter: 10 },
    );

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Updating User Location");
        this.setState({
          userlocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.000,
            longitudeDelta:  0.0121,
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  render() {
    return (

      <View style={styles.container}>
        <Text>User Latitude: {this.state.userlocation.latitude}</Text>
        <Text>User Longitude: {this.state.userlocation.longitude}</Text>
        <Text>Region Latitude: {this.state.region.latitude}</Text>
        <Text>Region Longitude: {this.state.region.longitude}</Text>
        <Text>Error: {this.state.error}</Text>
        <Icon name="ios-pin" style={styles.absicon}/>
        <Fab
           active={this.state.active}
           direction="up"
           containerStyle={{}}
           style={{ backgroundColor: '#5067FF' }}
           position="bottomRight"
           onPress={() => this.setState({ active: !this.state.active })}>
           <Icon name="share" />
           <Button style={{ backgroundColor: '#34A34F' }}>
             <Icon name="ios-search-outline" />
           </Button>
           <Button style={{ backgroundColor: '#3B5998' }} onPress={this._onPressButton}>
             <Icon name="ios-pin-outline" />
           </Button>
           <Button disabled style={{ backgroundColor: '#DD5144' }}>
             <Icon name="mail" />
           </Button>
        </Fab>
        <MapView
          customMapStyle={mapStyle}
          style={styles.map}
          initialRegion={this.state.userlocation}
          region={this.state.region}
          onRegionChange={this._onRegionChange}>
        </MapView>
      </View>

    );
  }
  _onRegionChange = (region) => {
    this.setState({ region });
  }
  _onPressButton = () => {
    console.log("refreshing location");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        Toast.show({
              text: 'Resetting your location!',
              position: 'bottom',
              buttonText: 'Okay'
        })
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
          userlocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta:  0.0121,
          },
          error: null
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000, distanceFilter: 10 },
    );
  }
}

mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];
let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -99
  },
  map: {
    flex: 1,
    width: width,
    height: height,
    zIndex: -98

  },
  header: {
    textAlign: 'center',
  },
  absicon: {
    position: 'absolute',
    fontSize: 55,
    color: 'blue',
    marginTop: -37,
    marginLeft: -11,
    left: '50%',
    top: '50%',
    zIndex: 2,
    opacity : 0.5
  }
});
