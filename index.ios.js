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
  ListView
} from 'react-native';

var REQUEST_URL = 'http://jodelstats.com/countries/DE.json';

class JodelStatsReactNative extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
          loaded: true
        });
      });
  }

  render() {
    if (this.state.loaded) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCityPreview}
          style={styles.listView}
        />
      )
    } else {
      return this.renderLoadingView();
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderCityPreview(city) {
    return (
      <View style={jodelStyle("#" + city.first_jodel.color)}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{city.name}</Text>
          <Text style={styles.year}>{city.first_jodel.message}</Text>
        </View>
      </View>
    );
  }
}

jodelStyle = function(jodelColor) {
  return {
    backgroundColor: jodelColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 50,
    height: 80
  },
  listView: {
    paddingTop: 20
  }
});

AppRegistry.registerComponent('JodelStatsReactNative', () => JodelStatsReactNative);
