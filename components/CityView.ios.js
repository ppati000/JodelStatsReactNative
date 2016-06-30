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
  TabBarIOS
} from 'react-native';
import styles from '../assets/styles';
import dynamicStyles from '../assets/dynamicStyles';
import constants from '../constants';

class CityView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      refreshing: true
    };
    this.state.cityName = props.cityName;
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
        fetch(constants.REQUEST_URL + "/cities/" + this.state.cityName + ".json")
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
    return this._renderContent();
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

  renderJodel(jodel) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{"Voted " + jodel.vote_count + " times:"}</Text>
          <View style={styles.messageWrapper}>
            <Text style={dynamicStyles.messageStyle("#" + jodel.color)}>{jodel.message}</Text>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = CityView;
