/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  MapView,
  StyleSheet,
  View
} from 'react-native';

export default class weather extends Component {
  getInitialState() {
    return {
        pin: {
            latitude: 0,
            longitude: 0
        }
    }
  }

  render() {
    const pins = [{
        latitude: 37,
        longitude: -95
    }];

    return (
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}>
      </MapView>
    );
  }

  onRegionChangeComplete (region) {
    this.setState({
        pin: {
            longitude: region.longitude,
            latitude: region.latitude
        }
    }); 
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

AppRegistry.registerComponent('weather', () => weather);
