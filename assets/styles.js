import { StyleSheet } from 'react-native';

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
    marginLeft: 7,
    marginRight: 7,
    fontSize: 15
  },
  thumbnail: {
    width: 50,
    height: 80
  },
  listView: {
    flex: 1,
  },
  android_listView: {
    flex: 1,
    marginTop: 50
  },
  imageText: {
    fontSize: 20,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    color: 'white',
    textShadowColor: '#000000',
    textShadowRadius: 100
  },
  imageTextContainer: {
    paddingTop: 40,
    flex: 1,
    height: 100,
  }
});

module.exports = styles;
