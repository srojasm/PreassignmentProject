import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import Topics from './data.json';
import { FlatList, SafeAreaView, TextInput, StyleSheet, Text, View } from 'react-native';
//import { json } from "express/lib/response";

export default function App() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(Topics.data);
    setMasterDataSource(Topics.data);
  },[]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const searchString = text.toLowerCase();
      const newData = masterDataSource.filter( (item) =>{
        return(
          item.title.toLowerCase().includes(searchString)
        );
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>
          Research Program on Children and Adversity
        </Text>
        <Text>
          Research Projects
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
  summary: {
    fontSize: 10,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
