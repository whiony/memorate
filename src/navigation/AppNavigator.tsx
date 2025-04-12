import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import AddNoteScreen from '../features/addNote/AddNoteScreen';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebaseConfig';
import { colors, fonts } from '../theme/theme';

export interface Note {
    id: string;
    name: string;
    comment: string;
    rating: number;
    image?: string;
    category: string;
    created?: Date;
    price?: number;
    currency?: '€' | '$' | '₴';
}

export type RootStackParamList = {
    Home: undefined;
    AddNote: { note?: Note };
};

const Stack = createStackNavigator<RootStackParamList>();

const createCategoryList = (prevCategories: string[], ...newCategories: string[]) => {
    return [...new Set([...prevCategories, ...newCategories]).values()]
}

const AppNavigator = () => {
    const [categories, setCategories] = useState<string[]>(['Food', 'Cosmetics', 'Places']);

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'categories'));
            const loadedCategories = querySnapshot.docs.map((doc) => doc.data().name as string);
            setCategories((prevCategories) => createCategoryList(prevCategories, ...loadedCategories));
        };

        fetchCategories();
    }, []);

    const addCategory = async (newCategory: string) => {
        if (!categories.includes(newCategory)) {
            await addDoc(collection(firestore, 'categories'), { name: newCategory });
            setCategories((prevCategories) => createCategoryList(prevCategories, newCategory));
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={{
                        title: 'Memorate',
                        headerTitleStyle: { fontFamily: 'Poppins-Regular', fontWeight: 'bold', fontSize: 18 },
                    }}
                >
                    {(props) => (
                        <HomeScreen
                            {...props}
                            categories={categories}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="AddNote"
                    options={({ route }) => {
                        const isEditing = Boolean(route.params?.note);
                        return {
                            title: isEditing ? 'Edit Review' : 'Add Review',
                            headerTitleAlign: 'center',
                            headerStyle: { backgroundColor: colors.primary },
                            headerTintColor: '#fff',
                            headerTitleStyle: { fontFamily: fonts.mainFont, fontWeight: 'bold', fontSize: 18 },
                        };
                    }}
                >
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
