import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import AddNoteScreen from '../features/addNote/AddNoteScreen';
import { colors, fonts } from '../theme/theme';
import { CategoriesProvider } from '../hooks/useCategories';

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

const AppNavigator = () => {
    return (
        <CategoriesProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        options={{
                            title: 'Memorate',
                            headerTitleStyle: {
                                fontFamily: 'Montserrat-Regular',
                                fontWeight: 'bold',
                                fontSize: 18,
                            },
                        }}
                    >
                        {(props) => <HomeScreen {...props} />}
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
                        {(props) => <AddNoteScreen {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </CategoriesProvider>
    );
};

export default AppNavigator;
