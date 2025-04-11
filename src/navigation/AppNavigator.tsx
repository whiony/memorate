import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import AddNoteScreen from '../components/AddNoteScreen';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export interface Note {
    id: string;
    name: string;
    comment: string;
    rating: number;
    image?: string;
    category: string;
    created?: Date;
}

export type RootStackParamList = {
    Home: undefined;
    AddNote: { note?: Note };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const [categories, setCategories] = useState<string[]>(['Food', 'Cosmetics', 'Places']);

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'categories'));
            const loadedCategories = querySnapshot.docs.map((doc) => doc.data().name as string);
            setCategories((prevCategories) => [...prevCategories, ...loadedCategories]);
        };

        fetchCategories();
    }, []);

    const addCategory = async (newCategory: string) => {
        if (!categories.includes(newCategory)) {
            await addDoc(collection(firestore, 'categories'), { name: newCategory });
            setCategories((prevCategories) => [...prevCategories, newCategory]);
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
