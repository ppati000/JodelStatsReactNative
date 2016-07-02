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
  Navigator,
  RefreshControl,
  Alert,
  TouchableOpacity
} from 'react-native';
import CountryView from './components/CountryView';
import CityView from './components/CityView'

const styles = require('./assets/styles.js')
var REQUEST_URL = 'http://jodelstats.com';

class JodelStatsReactNative extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
          initialRoute={{id: 'CountryView', name: 'Index'}}
          renderScene={this._renderScene.bind(this)}
      />
    )
  }

  _renderScene(route, navigator) {
    if (route.id === 'CountryView') {
      return (<CountryView navigator={navigator}/>);
    }
    if (route.id === 'CityView') {
      return(<CityView cityName={route.name} navigator={navigator} />);
    }
  }

}

AppRegistry.registerComponent('JodelStatsReactNative', () => JodelStatsReactNative);
