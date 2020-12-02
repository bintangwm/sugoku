import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react'
import { 
  StyleSheet,
  Text, 
  View,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  BackHandler
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, validateResult, solveResult } from '../actions/index'
import InputBoard from '../components/InputBoard'
import bgImage from '../assets/batik.jpg'

export default function Game({ navigation, route }) {
  const board = useSelector(store => store.board)
  const playerBoard = useSelector(store => store.playerBoard)
  const loading = useSelector(store => store.loading)
  const status = useSelector(store => store.status)
  const isValidate = useSelector(store => store.isValidate)
  const time = useSelector(store => store.time)
  const [timer, setTimer] = React.useState()
  const dispatch = useDispatch()
  const { name, difficulty } = route.params
  
  useEffect(() => {
    clearInterval(timer)
    dispatch({ type: 'RESET_TIME' })
    dispatch(fetchBoard(difficulty))
    timeStart()
  }, [])

  useEffect(() => {
    switch (status) {
      case 'unsolved':
        Alert.alert('Unsolved', "Awww, seems your work is still unsolved")
        break;
      case 'notStarted':
        break;
      case 'unsolved':
          Alert.alert('Unsolved', "Awww, seems your work is still unsolved")
          break;
      case 'broken':
        Alert.alert('Broken', "Heyy, becareful! somethings wrong with your work!")
        break;
      case 'solved':
        dispatch({ type: 'CALCULATE_SCORE', time: time, name: name, difficulty })
        clearInterval(timer)
        return navigation.navigate('Finish', { name, difficulty })
      default:
        Alert.alert(status, `Oops, something wrong: ${status}`)
        break;
    }
  }, [status, isValidate])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [BackHandler])

  function timeStart() {
    setTimer(setInterval(frame, 1000));
    function frame() {
      dispatch({ type: 'SET_TIME' })
    }
  }

  function validateBoard() {
    dispatch(validateResult(playerBoard, status))
  }

  function solveBoard() {
    dispatch(solveResult(board))
  }

  if (loading) {
    return(
    <ImageBackground source={bgImage} style={styles.imageBackground}>
      <ActivityIndicator size="large" color="grey" />
    </ImageBackground>
    )
  }

  return (
    <ImageBackground source={bgImage} style={styles.imageBackground}>
      {/* <Text style={styles.title}>SUDO-Q</Text> */}
      <Text style={styles.time}>Time: {time}</Text>
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
  imageBackground: {
    flex: 1,
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
  title: {
    fontSize: 30,
    marginBottom: 20
  },
  buttonWrap:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    width: 200,
    marginTop: 20
  },
  time: {
    marginVertical:20,
    fontSize:20
  }
});
