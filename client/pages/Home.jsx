import React from 'react';
import { 
  Alert,
  Button,
  StyleSheet,
  Text, 
  TextInput, 
  View
} from 'react-native';
import { ImageBackground } from 'react-native';
import { setDifficultyAndName } from '../actions/index'
import { useDispatch } from 'react-redux'
import bgImage from '../assets/peach.jpg'

export default function Home({ navigation }) {
  const [name, setName] = React.useState('');
  const dispatch = useDispatch()

  function goToGame(difficulty) {
    if (!name) {
      return Alert.alert("Input your name!","Name can't be empty!")
    }
    const payload = {
      difficulty,
      name
    }
    dispatch(setDifficultyAndName(payload))
    navigation.navigate('Game')
    setName('')
  }

  return (
    <ImageBackground style={styles.container} source={bgImage}>
      <Text style={styles.title}>SUDO-Q</Text>
      <Text>Input your name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
        onChangeText={text => setName(text)}
        value={name}
      />
      <View style={styles.buttonDifficulty}>
        <Button style={styles.buttonDiff} title='Easy' onPress={() => goToGame('easy')}/>
        <Button style={styles.buttonDiff} title='Medium' onPress={() => goToGame('medium')}/>
        <Button style={styles.buttonDiff} title='Hard' onPress={() => goToGame('hard')}/>
        <Button style={styles.buttonDiff} title='Random' onPress={() => goToGame('random')}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  buttonDifficulty: {
    marginVertical: 20,
    padding: 4,
    height: 50,
    width: 300,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  buttonDiff:{
    // flex: 2,
    // textAlignVertical: 'center',
    // textAlign: 'center',
    // width: 40
  },
  title: {
    fontSize: 50,
    marginBottom: 80
  }
});
