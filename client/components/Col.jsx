import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
// import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeNumber } from '../actions/index'

export default function Col({ col, i, j, handleChangeNumber }) {
  const dispatch = useDispatch()

  function handleChangeNumber(value) {
    // console.log(i, j, value);
    const payload = {
      i, j, value
    }
    dispatch(changeNumber(payload))
  }
  
  return(
    <View>
      <TextInput 
        style={style.col}
        keyboardType='numeric'
        value={col}
        onChangeText={number => handleChangeNumber(number)}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    color: 'black',
    borderWidth: 1,
    height: 25,
    width: 25,
    textAlign: 'center',
    margin: 0,
    padding:0
  }
})