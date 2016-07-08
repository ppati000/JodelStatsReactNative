import React, { Component } from 'react';
import {
  Image,
  Navigator,
  View
} from 'react-native';
var Lightbox = require('react-native-lightbox');
import Commons from './Commons';

class JodelLightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    }
    this.commons = new Commons(this);
  }

  render() {
    return (<Navigator
            renderScene={this.renderImage.bind(this)}
            navigator={this.props.navigator}
            navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={this.commons.navigationBarRouteMapper("Image")} />
          } />);
  }

  renderImage() {
    return (
      <View style={{paddingTop: 50, flex: 1}}>
          <Image
            style={{flex: 1}}
            resizeMode="contain"
            source={{ uri: "http:" + this.state.url }}
          />
      </View>
   );
  }
}

module.exports = JodelLightbox;
