import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.example}>home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  example: {
    fontSize: 40,
  },
})

export default home