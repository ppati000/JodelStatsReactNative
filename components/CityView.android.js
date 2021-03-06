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
const { BlurView, VibrancyView } = require('react-native-blur');

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
                routeMapper={this.commons.navigationBarRouteMapper(this.state.cityName)} />
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

  _showLightbox(url) {
    this.props.navigator.push({
      id: 'JodelLightbox',
      url: url,
      navigtor: this.props.navigator
    });
  }

  renderJodel(jodel) {
    if (jodel.image_url !== null && jodel.image_url !== "null") {
      jodelContent = (
        <TouchableOpacity onPress={() => this._showLightbox(jodel.image_url)} style={{flex: 1}}r>
          <Image
            source={{uri: "https:" + jodel.thumbnail_url}}
            style={{height: 100, flex: 1}}>
              <View style={styles.imageTextContainer}>
                <Text style={styles.imageText}>Tap to View</Text>
              </View>
          </Image>
        </TouchableOpacity>
      )
    } else {
      jodelContent = <Text style={styles.message}>{jodel.message}</Text>
    }
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{"Voted " + jodel.vote_count + " times:"}</Text>
          <View style={styles.messageWrapper}>
            <View style={dynamicStyles.messageStyle("#" + jodel.color)}>
              {jodelContent}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = CityView;
