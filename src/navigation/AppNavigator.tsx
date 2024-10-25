import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

export type RootStackParamList = {
    Home: undefined;
    AddNote: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Product Notes' }} />
            <Stack.Screen name="AddNote" component={AddNoteScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;