/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

export default class stopwatch extends Component {
  getInitalState() {
    timeElapsed: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header, this.border('yellow')]}>
          <View style={[styles.timerWrapper, this.border('red')]}>
            <Text>
              00:00:00
            </Text>
          </View>
          <View style={[styles.buttonWrapper, this.border('green')]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={[styles.footer, this.border('blue')]}>
          <Text>
            I am a list of Laps
          </Text>
        </View>
      </View>
    );
  }

  startStopButton () {
    return (
        <TouchableHighlight
          underlayColor="gray"
          onPress={this.handleStartPress}
        >
            <Text>
                Start
            </Text>
        </TouchableHighlight>
    );
  }

  handleStartPress () {
    const startTime = new Date();
    this.setState({
      timeElapsed: new Date() - startTime
    });
  }

  lapButton () {
    return (
        <View>
            <Text>
                Lap
            </Text>
        </View>
    );
  }

  border (color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, //  Fill the entire the screen
      alignItems: 'stretch'
    },
    header: { //  Yellow
      flex: 1
    },
    footer: { //  Blue
      flex: 1
    },
    timerWrapper: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonWrapper: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
