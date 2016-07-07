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
  TabBarIOS,
  TouchableOpacity
} from 'react-native';
import styles from '../assets/styles';
import dynamicStyles from '../assets/dynamicStyles';
import constants from '../constants';
import Commons from './Commons';

class CityView extends Component {

  constructor(props) {
    super(props);
    this.commons = new Commons(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      refreshing: false,
      navigator: props.navigator,
      cityName: props.cityName
    };
  }

  componentDidMount() {
    this.setState({
      refreshing: true
    }, () => this.fetchData())
  }

  fetchData() {
    this.commons.fetchData(false); //act as visitor (Visitor Pattern)
  }

  renderLoadedView() {
    return (<Navigator
          renderScene={this._renderContent.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />);
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
        renderRow={this.renderJodel.bind(this)}
        style={styles.android_listView}
      />
     </View>);
  }

  _onRefresh() {
    this.fetchData();
  }

  render() {
    return this.renderLoadedView();
  }

  renderJodel(jodel) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{"Voted " + jodel.vote_count + " times:"}</Text>
          <View style={styles.messageWrapper}>
            <View style={dynamicStyles.messageStyle("#" + jodel.color)}>
              <Text style={styles.message}>{jodel.message}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16, }}>
          City
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = CityView;
