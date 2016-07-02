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
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import styles from '../assets/styles';
import dynamicStyles from '../assets/dynamicStyles';
import constants from '../constants';
import CityView from './CityView';

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
      refreshing: true,
      navigator: props.navigator
    };
    console.log("in setstate")
    this.state.countryCode = 'DE';
    console.log("in setCountryCode")
    console.log(this.state.countryCode)
  }

  componentDidMount() {
    this.setState({
      refreshing: true
    }, function() {
      this.fetchData();
    });
  }

  networkRequestFailed() {
    this.setState({
      refreshing: false
    });
    Alert.alert('Network Error', 'Could not load Jodel posts. Please check your connection.');
  }

  fetchData() {
    return new Promise(
      function(resolve, reject) {
        fetch(constants.REQUEST_URL + "/countries/" + this.state.countryCode + ".json")
          .then((response) => response.json())
          .then((json) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(json),
              refreshing: false
            });
          })
          .catch((error) => {
            this.networkRequestFailed();
          });
      }.bind(this));
  }

  renderLoadedView() {
    console.log("in renderLoadedView")
    return (
        <TabNavigator>
        <TabNavigator.Item
          title="Germany"
          selected={this.state.countryCode === 'DE'}
          onPress={() => {
            this.setState({
              countryCode: 'DE',
              refreshing: true
            }, function() {
              this.fetchData();
            });
          }}>
          {this._renderContent()}
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Austria"
          selected={this.state.countryCode === 'AT'}
          onPress={() => {
            this.setState({
              countryCode: 'AT',
              refreshing: true
            }, function() {
              this.fetchData();
            });
          }}>
          {this._renderContent()}
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Switzerland"
          selected={this.state.countryCode === 'CH'}
          onPress={() => {
            this.setState({
              countryCode: 'CH',
              refreshing: true
            }, function() {
              this.fetchData();
            });
          }}>
          {this._renderContent()}
        </TabNavigator.Item>
        <TabNavigator.Item
          title="Netherlands"
          selected={this.state.countryCode === 'NL'}
          onPress={() => {
            this.setState({
              countryCode: 'NL',
              refreshing: true
            }, function() {
              this.fetchData();
            });
          }}>
          {this._renderContent()}
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  _renderContent() {
    console.log("In _renderContent")
    return (
    <View style={{flex: 1}}>
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        dataSource={this.state.dataSource}
        renderRow={this.renderCityPreview.bind(this)}
        style={styles.android_listView}
      />
     </View>);
  }

  _onRefresh() {
    this.fetchData();
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderLoadedView.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper}
            />
          } />
    );
  }

  renderCityPreview(city) {
    return (
      <View>
        <TouchableHighlight onPress={() => this._onPressButton(city.name)} underlayColor='black'>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{city.name + " voted " + city.highest_votes + " times:"}</Text>
            <View style={styles.messageWrapper}>
              <Text style={dynamicStyles.messageStyle("#" + city.first_jodel.color)}>{city.first_jodel.message}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton(cityName) {
    this.props.navigator.push({
      id: 'CityView',
      name: cityName,
    })
  }
}



var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {Alert.alert("About", constants.aboutText);}}>
        <Text style={{color: 'white', margin: 10,}}>
          About
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 20, letterSpacing: -2, fontWeight: 'bold'}}>
          Jodel Stats
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = CountryView;
