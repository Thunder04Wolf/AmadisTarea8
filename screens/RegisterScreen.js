// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [audioUri, setAudioUri] = useState('');
  const [recording, setRecording] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePhotoPick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleAudioRecord = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
      } else {
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HighQuality
        );
        setRecording(newRecording);
      }
    } catch (error) {
      console.error('Failed to record audio', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = async () => {
    if (!title || !date) {
      Alert.alert('Error', 'Please provide a title and date.');
      return;
    }

    const newIncident = {
      title,
      date: date.toISOString(),
      description,
      photoUri,
      audioUri,
    };

    try {
      const storedIncidents = await AsyncStorage.getItem('incidents');
      const incidents = storedIncidents ? JSON.parse(storedIncidents) : [];
      incidents.push(newIncident);
      await AsyncStorage.setItem('incidents', JSON.stringify(incidents));
      Alert.alert('Success', 'Incident registered successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save the incident.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Select Date" onPress={showDatepicker} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text>Date: {date.toDateString()}</Text>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Pick a photo" onPress={handlePhotoPick} />
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.image} /> : null}
      <Button title={recording ? "Stop Recording" : "Record Audio"} onPress={handleAudioRecord} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginVertical: 16,
  },
});
