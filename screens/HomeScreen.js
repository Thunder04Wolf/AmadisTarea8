// screens/HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert("Todos los registros han sido borrados");
  } catch (e) {
    Alert.alert("Error al borrar los registros");
  }
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Registrar Incidencia" onPress={() => navigation.navigate('Register')} />
      <Button title="Ver Incidencias" onPress={() => navigation.navigate('ViewIncidents')} />
      <Button title="Acerca de" onPress={() => navigation.navigate('About')} />
      <Button title="Borrar Todos los Registros" onPress={clearStorage} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'right',
    padding: 40,
  },
});
