import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  Button,
  ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { resetGame } from '../actions/index'
import bgImage from '../assets/bohemian.jpg'

export default function Finish({ navigation, route }) {
  // const { name, score } = route.params
  const name = useSelector(store => store.name)
  const difficulty = useSelector(store => store.difficulty)
  const dispatch = useDispatch()

  function goToHomeScreen() {
    dispatch(resetGame())
    navigation.navigate('Home')
  }

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <Text style={styles.congratulation}>Congratulation</Text>
      <Text style={styles.name}>{ name }</Text>
      <Text style={styles.difficulty}>Difficulty: { difficulty }</Text>
      <Button 
        title='Play Again'
        onPress={goToHomeScreen}
        color='green'
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratulation: {
    fontSize: 50
  },
  name: {
    marginTop: 10,
    fontSize: 40
  },
  difficulty: {
    fontSize: 15,
    marginBottom: 15
  }
});
