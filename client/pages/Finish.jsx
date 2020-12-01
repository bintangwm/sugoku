import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Button
} from 'react-native';

export default function Finish({ navigation, route }) {
  const { name, score } = route.params

  function goToHomeScreen() {
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
