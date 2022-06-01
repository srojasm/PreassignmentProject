import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
fetch('data.json')
.then((response) => {
  return response.json();
})

const renderData = (topic) => {
  return (
  <View>
    <Text id="title">topic[0]</Text>
    <Text id="summary">topic[1]</Text>
  </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
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
