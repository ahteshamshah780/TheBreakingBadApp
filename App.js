import React from 'react';
import { Button, TouchableOpacity, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import BreakingBadChars from './src/BreakingBadChars';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import FavouriteList from './src/containers/FavouriteList';
import CharDetails from './src/compnents/CharacterDetails';
import SearchScreen from './src/compnents/SearchScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer ref={nav => { this.navigator = nav; }} />
      </Provider>
    )
  }
}

const AppNavigator = createStackNavigator({
  BreakingBadChars: {
    screen: BreakingBadChars
  },
  FavouriteList: {
    screen: FavouriteList,
    navigationOptions: {
      title: 'Favourite List',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      },
    },
  },
  CharDetails: {
    screen: CharDetails,
    navigationOptions: {
      title: 'Character Details',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      },
    },
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search Character',
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      },
    },
  },
},
  {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#FFFFFF' },
    initialRouteName: "BreakingBadChars"
  })

const AppContainer = createAppContainer(AppNavigator);
