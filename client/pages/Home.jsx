import React from 'react';
import { 
  Alert,
  Button,
  StyleSheet,
  Text, 
  TextInput, 
  View
} from 'react-native';
// import 

export default function Home({ navigation }) {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    
  },[name])

  function goToGame(difficulty) {
    if (!name) {
      return alert("Name can't be empty!")
    }
    navigation.navigate('Game', {
      difficulty,
      name
    })
    setName('')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
        onChangeText={text => setName(text)}
        value={name}
      />
      <View style={styles.buttonDifficulty}>
        <Button title='Easy' onPress={() => goToGame('easy')}/>
        <Button title='Medium' onPress={() => goToGame('medium')}/>
        <Button title='Hard' onPress={() => goToGame('hard')}/>
        <Button title='Random' onPress={() => goToGame('random')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDifficulty: {
    margin: 10,
    padding: 4,
    flexDirection: 'row'
  }
});
