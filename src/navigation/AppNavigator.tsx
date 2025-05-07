import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import HomeScreen from '@/features/home/HomeScreen'
import AddNoteScreen from '@/features/addNote/AddNoteScreen'
import NoteDetails from '@/features/noteDetails/NoteDetails'
import FilterModal from '@/modals/FilterModal'

import { CategoriesProvider } from '@/hooks/useCategories'
import { SortProvider, SortKey } from '@/contexts/SortContext'

export interface Note {
    id: string
    name: string
    comment: string
    rating: number
    image?: string
    category: string
    created?: Date
    price?: number
    currency?: '€' | '$' | '₴'
}

export type NavNote = Omit<Note, 'created'> & { created: string }

export type RootStackParamList = {
    Home: undefined
    AddNote: { note?: NavNote }
    NoteDetails: { note: NavNote }
    FilterModal: { current: SortKey }
}

const Stack = createStackNavigator<RootStackParamList>()

const defaultOptions: StackNavigationOptions = { headerShown: false }

const modalOptions: StackNavigationOptions = {
    presentation: 'transparentModal',
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },
}

const AppNavigator: FC = () => (
    <CategoriesProvider>
        <SortProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={defaultOptions}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="AddNote" component={AddNoteScreen} />
                    <Stack.Screen name="NoteDetails" component={NoteDetails} />
                    <Stack.Screen
                        name="FilterModal"
                        component={FilterModal}
                        options={modalOptions}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SortProvider>
    </CategoriesProvider>
)

export default AppNavigator
