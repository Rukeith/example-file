/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import moment from 'moment';
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
    timeElapsed: '00:00:00',
    running: false,
    startTime: null,
    laps: []
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.timerWrapper}>
            <Text style={styles.timer}>
              {moment(this.state.timeElapsed).format('mm:ss:SS')}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>

        <View style={[styles.footer]}>
          <Text>
            {this.laps()}
          </Text>
        </View>
      </View>
    );
  }

  laps () {
    return this.state.laps.map((time, index) => {
        return <View style={styles.lap}>
            <Text style={styles.lapText}>
                Lap #{index + 1}
            </Text>
            <Text style={styles.lapText}>
                {moment(time).format('mm:ss:SS')}
            </Text>
        </View>
    });
  }

  startStopButton () {
    const style = this.state.running ? styles.stopButton : styles.startButton;

    return (
        <TouchableHighlight
          underlayColor="gray"
          onPress={this.handleStartPress}
          style={[styles.button, style]}
        >
            <Text>
                {this.state.running ? 'Stop' : 'Start'}
            </Text>
        </TouchableHighlight>
    );
  }

  handleStartPress () {
    if (this.state.running) {
        clearInterval(this.interval);
        this.setState({ running: false, laps: [] });
        return;
    }

    this.setState({ startTime: new Date()  });

    this.interval = setInterval(() => {
        this.setState({
            timeElapsed: new Date() - this.state.startTime,
            running: true
        });
    }, 30);
  }

  lapButton () {
    return (
        <TouchableHighlight style={styles.button} underlayColor="gray" onPress={this.handleLapPress}>
            <Text>
                Lap
            </Text>
        </TouchableHighlight>
    );
  }

  handleLapPress () {
    const lap = this.state.timeElapsed;

    this.setState({
        startTime: new Date(),
        laps: this.state.laps.concat([lap])
    });
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
    },
    timer: {
      fontSize: 60  
    },
    button: {
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton: {
        borderColor: '#00CC00'
    },
    stopButton: {
        borderColor: '#CC0000'
    },
    lap: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    lapText: {
        fontSize: 30
    }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
