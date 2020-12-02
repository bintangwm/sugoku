import React from 'react'
import { 
  StyleSheet,
  Text, 
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import { useDispatch } from 'react-redux'
import { changeNumber } from '../actions/index'

export default function InputBoard({ item, i, j }) {
  const dispatch = useDispatch()

  function handleChangeNumber(value, i, j) {
    if (!value) {
      value = 0
    }
    const payload = {
      i, j, value
    }
    dispatch(changeNumber(payload))
  }

  if (item !== 0) {
    return (
      <View style={styles.boardItem}>
        <Text>{item}</Text>
      </View>
    )
  }

  return(
    <View style={styles.boardInput}>
      <TextInput 
        style={styles.boardValue}
        keyboardType='numeric'
        maxLength={1}
        onChangeText={number => handleChangeNumber(number, i, j)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  boardValue: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // width: 40,
    // height: 40,
    // backgroundColor: 'skyblue',
    // borderWidth: 0.5,
  },
  boardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'skyblue',
    borderWidth: 0.5,
  },
  boardInput: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderWidth: 0.5,
    backgroundColor: 'white'
  }
});