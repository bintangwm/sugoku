import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react'
import { 
  StyleSheet,
  Text, 
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground
} from 'react-native';
import Row from '../components/Row'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, validateResult, solveResult } from '../actions/index'
import { setDifficulty } from '../actions/index'
import InputBoard from '../components/InputBoard'
import bgImage from '../assets/batik.jpg'

export default function Game({ navigation, route }) {
  const board = useSelector(store => store.board)
  const playerBoard = useSelector(store => store.playerBoard)
  const difficulty = useSelector(store => store.difficulty)
  const loading = useSelector(store => store.loading)
  const status = useSelector(store => store.status)
  const isValidate = useSelector(store => store.isValidate)
  const dispatch = useDispatch()
  // const { name } = route.params
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])

  useEffect(() => {
    switch (status) {
      case 'notStarted':
        Alert.alert('Game Started!', "Solve the Sudoku as fast as you can! :D")
        break;
      case 'solved':
        Alert.alert('Congratulation', "You've solved the game! Yeayyy!")
        return navigation.navigate('Finish')
      default:
        Alert.alert(status, `Awww, seems your work is still ${status}`)
        break;
    }
  }, [status, isValidate])

  function validateBoard() {
    dispatch(validateResult(playerBoard, status))
  }

  function solveBoard() {
    dispatch(solveResult(board))
  }

  if (loading) {
    return(
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="grey" />
    </View>
    )
  }

  return (
    <ImageBackground source={bgImage} style={styles.container}>
    {/* <View style={styles.container}> */}
      <Text style={styles.title}>SUDO-Q</Text>
      <StatusBar style="auto" />
      <View style={styles.board}>
        {
          board.map((rowItem, i) => (
            <View key={i} style={ styles.rowItem }>
              {
                rowItem.map((item, j) => (                  
                  <InputBoard
                    key={j} 
                    item={item}
                    i={i}
                    j={j}
                  />
                ))
              }
            </View>
          ))
        }
      </View>
      <View style={styles.buttonWrap}>
        <Button
          title="Validate"
          onPress={validateBoard}
        />
        <Button
          title="Solve"
          onPress={solveBoard}
        />
      </View>
    {/* </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  boardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderWidth: 0.5,
  },
  rowItem:{
    // width: 121, height: 121,
    // flexDirection: 'column', 
    // flexWrap: 'wrap',
    // borderWidth: 0.3
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 365,
    width: 365
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  title: {
    fontSize: 30,
    // marginTop: 20,
    marginBottom: 50
  },
  buttonWrap:{
    flexDirection: 'row', 
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    width: 200,
    marginTop: 20
  }
});
