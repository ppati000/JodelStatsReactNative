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
  Alert
} from 'react-native';

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
        <Navigator
          style={{ flex:1 }}
          initialRoute={{ name: "countries" }}
          renderScene={ this.renderScene }
          parentClass={this}
        />
    )
  }

}

class CountryView extends Component {

  constructor(props) {
    console.log("in countryview")
    super(props);
    console.log("in superprops")
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      selectedIndex: 0,
      loaded: false,
      refreshing: true
    };
    console.log("in setstate")
    this.state.countryCode = 'DE';
    console.log("in setCountryCode")
    console.log(this.state.countryCode)
  }

  componentDidMount() {
    this.fetchData();
    this.setState({
      loaded: true,
      refreshing: false
    });
  }

  networkRequestFailed() {
    this.setState({
      loaded: true,
      refreshing: false
    });
    Alert.alert('Network Error', 'Could not load Jodel posts. Please check your connection.');
  }

  fetchData() {
    console.log(REQUEST_URL + "/countries/" + this.state.countryCode + ".json")
    fetch(REQUEST_URL + "/countries/" + this.state.countryCode + ".json")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
          loaded: true,
          refreshing: false
        });
      })
      .catch((error) => {
        this.networkRequestFailed();
      });
  }

  renderLoadedView() {
    console.log("in renderLoadedView")
    return (
      <View style={{flex: 1}}>
        <SegmentedControlIOS
          style={styles.countryControl}
          values={['DE', 'AT', 'CH', 'NL']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            this.setState({
              selectedIndex: event.nativeEvent.selectedSegmentIndex,
            });
          }}
          onValueChange={(value) => {
            this.state.countryCode = value;
            this.state.refreshing = true;
            this.fetchData()
          }}
        />
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={this.renderCityPreview}
          style={styles.listView}
        />
      </View>
    )
  }

  _onRefresh() {
    this.fetchData();
  }

  render() {
    if (this.state.loaded) {
      return this.renderLoadedView();
    } else {
      return this.renderLoadingView();
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  renderCityPreview(city) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{city.name + " voted " + city.highest_votes + " times:"}</Text>
          <View style={styles.messageWrapper}>
            <Text style={messageStyle("#" + city.first_jodel.color)}>{city.first_jodel.message}</Text>
          </View>
        </View>
      </View>
    );
  }
}

messageStyle = function(jodelColor) {
  return {
    flex: 1,
    flexDirection: 'row',
    alignSelf: "stretch",
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    color: '#FFFFFF',
    backgroundColor: jodelColor
  }
}

const styles = StyleSheet.create({
  countryControl: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  messageWrapper: {
    flexDirection: "row"
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    paddingTop: 20
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left'
  },
  message: {
    flex: 1,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  thumbnail: {
    width: 50,
    height: 80
  },
  listView: {
    flex: 1,
  }
});

AppRegistry.registerComponent('JodelStatsReactNative', () => JodelStatsReactNative);
