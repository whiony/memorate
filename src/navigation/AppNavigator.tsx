import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';

export type RootStackParamList = {
    Home: undefined;
    AddNote: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const [categories, setCategories] = useState<string[]>(['Food', 'Cosmetics', 'Places']);

    const addCategory = (newCategory: string) => {
        if (!categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={{ title: 'Review Notes' }}
                >
                    {(props) => (
                        <HomeScreen
                            {...props}
                            categories={categories}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="AddNote">
                    {(props) => (
                        <AddNoteScreen
                            {...props}
                            categories={categories}
                            addCategory={addCategory}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;