// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ViewIncidentsScreen from './screens/ViewIncidentsScreen';
import IncidentDetailScreen from './screens/IncidentDetailScreen';
import AboutScreen from './screens/AboutScreen'; // Si tienes esta pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ViewIncidents" component={ViewIncidentsScreen} />
        <Stack.Screen name="IncidentDetail" component={IncidentDetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
