/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  SegmentedControlIOS,
  NavigatorIOS,
  RefreshControl,
  Alert
} from 'react-native';
import CountryView from './components/CountryView';

const styles = require('./assets/styles.js')
var REQUEST_URL = 'http://jodelstats.com';

class JodelStatsReactNative extends Component {

  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
         return (
         <View style={styles.container}>
            <CountryView
              navigator={navigator}
            />
      </View>)
  }

  render() {
    return (
      <NavigatorIOS
        tintColor='#FF9908'
        style={{flex: 1}}
        initialRoute={{
          component: CountryView,
          title: 'My View Title',
          passProps: {
            REQUEST_URL: REQUEST_URL,
          },
        }}
      />
    )
  }

}

AppRegistry.registerComponent('JodelStatsReactNative', () => JodelStatsReactNative);
