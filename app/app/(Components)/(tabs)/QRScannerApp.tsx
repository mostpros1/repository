import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRScanner from './QRScanner';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>QR Code Scanner</Text>
      <QRScanner />
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
});
