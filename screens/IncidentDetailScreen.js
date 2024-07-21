// screens/IncidentDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function IncidentDetailScreen({ route }) {
  const { incident } = route.params;
  const [sound, setSound] = useState();
  const soundRef = useRef(null);

  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      if (incident.audioUri) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          { uri: incident.audioUri }
        );
        soundRef.current = loadedSound;
      }
    };
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [incident.audioUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{incident.title}</Text>
      <Text>Date: {incident.date}</Text>
      <Text>Description: {incident.description}</Text>
      {incident.photoUri && <Image source={{ uri: incident.photoUri }} style={styles.image} />}
      {incident.audioUri && (
        <View>
          <Text>Audio:</Text>
          <Button title="Play Audio" onPress={playSound} />
          <Button title="Stop Audio" onPress={stopSound} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
