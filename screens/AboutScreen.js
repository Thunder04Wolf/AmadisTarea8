// screens/AboutScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import photo from '../assets/photo.png';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
        
      <Image source={photo} style={styles.image} />
      <Text>Nombre: Pedro Antonio</Text>
      <Text>Apellido: García Encarnacíon</Text>
      <Text>Matrícula: 2022-2033</Text>
      <Text style={styles.phrase}>
        "La seguridad es nuestra misión, la vigilancia nuestra herramienta, el servicio a la comunidad nuestro objetivo."
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  phrase: {
    marginTop: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
