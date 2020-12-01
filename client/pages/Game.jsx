import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react'
import { 
  StyleSheet,
  Text, 
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import Row from '../components/Row'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, validateResult } from '../actions/index'
import { changeNumber } from '../actions/index'

export default function Game({ navigation, route }) {
  const board = useSelector(store => store.board)
  const dispatch = useDispatch()
  const { name, difficulty } = route.params

  useEffect(() => {
    dispatch(fetchBoard())
  }, [])

  function validateBoard() {
    alert('validating')
    // dispatch(validateResult(board))
    navigation.navigate('Finish', {
      name: name || 'unknown'
    })
  }

  function handleChangeNumber(value, i, j) {
    if (!value) {
      value = 0
    }
    const payload = {
      i, j, value
    }
    dispatch(changeNumber(payload))
  }

  return (
    <View style={styles.container}>
      {/* <Text>{ JSON.stringify(board) }</Text> */}
      <Text>sudo-Qu</Text>
      <StatusBar style="auto" />
      <View style={styles.board}>
        {
          board.map((rowItem, i) => (
            <View key={i} style={ styles.rowItem }>
              {
                rowItem.map((item, j) => (
                  <View key={j} style={styles.boardItem}>
                    {/* <Text>{item}</Text> */}
                    {/* {
                      (item == "" || item == "0") 
                        ? <Text>{item}</Text>
                        // : <TextInput 
                        //   style={styles.boardValue}
                        //   keyboardType='numeric'
                        //   defaultValue={item}
                        //   // onChangeText={number => handleChangeNumber(number, i, j)}
                        // />
                        : <Text style={{color: 'red'}}>{item}</Text>
                    } */}
                    <TextInput 
                      style={styles.boardValue}
                      keyboardType='numeric'
                      value={item.toString()}
                      onChangeText={number => handleChangeNumber(number, i, j)}
                    />
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
      <Button
        title="Validate"
        onPress={validateBoard}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  boardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'skyblue',
    borderWidth: 0.5,
  },
  boardValue: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 40,
    // height: 40,
    // backgroundColor: 'skyblue',
    // borderWidth: 0.5,
  },
  rowItem:{
    width: 120, height: 120,
    backgroundColor: 'powderblue',
    flexDirection: 'row', 
    flexWrap: 'wrap',
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
    height: 363,
    width: 363,
    borderWidth: 0.5
  }
});
