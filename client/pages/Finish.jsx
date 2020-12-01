import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Button
} from 'react-native';
import { useDispatch } from 'react-redux'
import { resetGame } from '../actions/index'

export default function Finish({ navigation, route }) {
  const { name, score } = route.params
  const dispatch = useDispatch()

  function goToHomeScreen() {
    dispatch(resetGame())
    navigation.navigate('Home')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Congratulation</Text>
      <Text>{ name }</Text>
      <Button 
        title='Play Again'
        onPress={goToHomeScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
