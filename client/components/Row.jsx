import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { useState, useEffect } from 'react'
import Col from './Col'

export default function Row({ row, i }) {
  return(
    <View>
      <FlatList
        style={style.row}
        data={row}
        renderItem={({ item, index }) => {
          return <Col col={item} i={i} j={index}/>
        }}
        keyExtractor={(col, i) => i.toString()}
      />
    </View>
  )
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  }
})