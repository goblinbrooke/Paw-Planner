import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';

// list that holds all of the pet components

function PetsListScreen(props) {
  // const mariahImage = <Image source={{uri:'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg'}}/>

  const [people, setPeople] = useState([
    {name: 'Mariah', key: 1, photo: null},
    {name: "Brooke", key: 2, photo: null},
    {name: "Boney", key: 3, photo: null}
  ])

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}  
      />
    </View>
  );
}

export default PetsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#0782F9',
    fontSize: 24,
  }
})