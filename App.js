import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import Topics from './data.json';
import { FlatList, SafeAreaView, TextInput, StyleSheet, Text, View } from 'react-native';
//import { CenterFocusStrong } from "@material-ui/icons";
//import { json } from "express/lib/response";

export default function App() {
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(Topics.data);
    setMasterDataSource(Topics.data);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const searchString = text.toLowerCase();
      const newData = masterDataSource.filter((item) => {
        return (
          item.title.toLowerCase().includes(searchString)
        );
      });
      setFilteredDataSource(newData);
      setSearch(text);
      setToggle(true);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
      setToggle(false);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} >
        <Text style={styles.title}>{item.title}</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 25,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.pageTitle}>
            Research Program on Children and Adversity
          </Text>
        </View>
        <View style={styles.mainBox}>
          <Text style={styles.research}>
            Research Projects
          </Text>
          <TextInput
            style={[styles.textInputStyle, {borderColor: !toggle ? 'black' : '#F3AD41'}]}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search Titles"
          />
          <FlatList
            data={filteredDataSource}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
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
    borderWidth: 20,
    borderColor: 'white'
  },
  title: {
    fontSize: 17,
  },
  summary: {
    fontSize: 12,
  },
  itemStyle: {
    padding: 13,
    borderWidth: 1,
    borderColor: '#E2D06D',
    borderRadius: 3
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 3
  },
  pageTitle: {
    fontSize: 27,
    textAlign: 'center',
    padding: 10,
    color: 'white'
  },
  titleBox: {
    backgroundColor: '#063779',
    width: '100%'
  },
  research: {
    fontSize: 21,
    paddingTop: 15,
    textAlign: 'left',
    width: '100%'
  },
  mainBox: {
    margin: 10,
    flex: 1
  }
});
