import React from 'react';
import Home from './pages/Home'
import Game from './pages/Game'
import Finish from './pages/Finish'
import store from './store/index'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function App() {
  const Stack = createStackNavigator()
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Game' component={Game} />
          <Stack.Screen name='Finish' component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

