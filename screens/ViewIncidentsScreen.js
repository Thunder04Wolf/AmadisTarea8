// screens/ViewIncidentsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewIncidentsScreen({ navigation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      const storedIncidents = await AsyncStorage.getItem('incidents');
      if (storedIncidents) {
        setIncidents(JSON.parse(storedIncidents));
      }
    };

    fetchIncidents();
  }, []);

  const renderIncident = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('IncidentDetail', { incident: item })}
      style={styles.incident}
    >
      <Text>{item.title}</Text>
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={incidents}
        renderItem={renderIncident}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  incident: {
    padding: 16,
    borderBottomWidth: 1,
  },
});
