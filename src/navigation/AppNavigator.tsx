import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import AddNoteScreen from '../features/addNote/AddNoteScreen';
import { CategoriesProvider } from '../hooks/useCategories';
import NoteItem from '../features/noteItem/NoteItem';
import FilterModal from '../components/FilterModal';
import { SortKey, SortProvider } from '../contexts/SortContext';

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
    FilterModal: { current: SortKey };
    NoteItem: { note: Note }
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <CategoriesProvider>
            <SortProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="AddNote"
                            component={AddNoteScreen}
                            options={({ route }) => {
                                const isEditing = Boolean(route.params?.note);
                                return {
                                    headerShown: false,
                                };
                            }}
                        />
                        <Stack.Screen
                            name="FilterModal"
                            component={FilterModal}
                            options={{
                                presentation: 'transparentModal',
                                headerShown: false,
                                cardStyle: { backgroundColor: 'transparent' },
                            }}
                        />
                        <Stack.Screen name="NoteItem" component={NoteItem} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SortProvider>
        </CategoriesProvider>
    );
};

export default AppNavigator;
