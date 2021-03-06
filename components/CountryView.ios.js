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
  Alert,
  TabBarIOS,
  TouchableHighlight
} from 'react-native';
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
    console.log(constants.REQUEST_URL + "/cities/" + this.state.countryCode + ".json")
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
        <TabBarIOS>
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
        <TabBarIOS.Item
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
        </TabBarIOS.Item>
      </TabBarIOS>
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
        style={styles.listView}
      />
     </View>);
  }

  _onRefresh() {
    this.fetchData();
  }

  render() {
    return this.renderLoadedView();
  }

  renderCityPreview(city) {
    return (
      <View>
        <TouchableHighlight onPress={() => this._onPressButton(city.name)} underlayColor='black'>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{city.name + " voted " + city.highest_votes + " times:"}</Text>
            <View style={styles.messageWrapper}>
            <View style={dynamicStyles.messageStyle("#" + city.first_jodel.color)}>
              <Text style={styles.message}>{city.first_jodel.message}</Text>
            </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton(cityName) {
    this.state.navigator.push({
      component: CityView,
      title: cityName,
      passProps: {
        cityName: cityName
      }
    })
  }
}

module.exports = CountryView;
