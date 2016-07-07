import React, { Component } from 'react';
import { Alert } from 'react-native';

import CountryView from './CountryView';
import constants from '../constants';

/*
This class acts as a visitor acceptor for CountryView and CityView.
It handles all the common functionality of those two classes.
*/

class Commons {
  constructor(component) {
    this.component = component;
  }

  networkRequestFailed() {
    this.component.setState({
      refreshing: false
    });
    Alert.alert('Network Error', 'Could not load Jodel posts. Please check your connection.');
  }

  async fetchData(forCountry) {
    try {
      if (forCountry) {
        var url = constants.REQUEST_URL + "/countries/" + this.component.state.countryCode + ".json";
      } else {
        var url = constants.REQUEST_URL + "/cities/" + this.component.state.cityName + ".json";
      }
      let response = await fetch(url);
      let json = await response.json();
      this.component.setState({
        dataSource: this.component.state.dataSource.cloneWithRows(json),
        refreshing: false
      })
    } catch(error) {
        console.log(error)
        this.networkRequestFailed();
    }
  }

}
module.exports = Commons;
