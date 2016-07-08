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
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import styles from '../assets/styles';
import dynamicStyles from '../assets/dynamicStyles';
import constants from '../constants';
import CityView from './CityView';
import Commons from './Commons'

class CountryView extends Component {

  constructor(props) {
    super(props);
    this.commons = new Commons(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      selectedIndex: 0,
      refreshing: false,
      countryCode: 'DE',
      navigator: props.navigator
    };

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      this.state.navigator.pop();
      return true;
    });

  }

  componentDidMount() {
    this.setState({
      refreshing: true
    }, () => this.fetchData())
  }

  fetchData() {
    this.commons.fetchData(true);
  }

  renderLoadedView() {
    return (
        <TabNavigator>
        <TabNavigator.Item
          title="Germany"
          selected={this.state.countryCode === 'DE'}
          renderIcon={() => <Image source={require('../assets/de.png')} style={{width: 20, height: 20}} />}
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
          renderIcon={() => <Image source={require('../assets/at.png')} style={{width: 20, height: 20}} />}
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
          renderIcon={() => <Image source={require('../assets/ch.png')} style={{width: 20, height: 20}} />}
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
          renderIcon={() => <Image source={require('../assets/nl.png')} style={{width: 20, height: 20}} />}
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
    if (city.first_jodel.image_url !== null && city.first_jodel.image_url !== "null") {
      jodel = <Image source={{uri: "https:" + city.first_jodel.thumbnail_url}} style={{height: 100, flex: 1}} />
    } else {
      jodel = <Text style={styles.message}>{city.first_jodel.message}</Text>
    }
    return (
      <View>
        <TouchableHighlight onPress={() => this._onPressButton(city.name)} underlayColor='black'>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{city.name + " voted " + city.highest_votes + " times:"}</Text>
            <View style={styles.messageWrapper}>
              <View style={dynamicStyles.messageStyle("#" + city.first_jodel.color)}>
                {jodel}
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton(cityName) {
    console.log("button pressed")
    this.props.navigator.push({
      id: 'CityView',
      name: cityName,
      cityName: cityName
    }, function() {
      console.log("push finished");
    })
    console.log("method end")
  }
}



var NavigationBarRouteMapper = {
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {Alert.alert("About", constants.aboutText);}}>
        <Text style={{color: 'white', margin: 10,}}>
          About
        </Text>
      </TouchableOpacity>
    );
  },
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginLeft: 7}}>
        <Image
          source={require('../assets/ic_launcher.png')}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 20, letterSpacing: -2, fontWeight: 'bold'}}>
          Jodel Stats
        </Text>
      </View>
    );
  }
};

module.exports = CountryView;
