import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { View, ActivityIndicator } from 'react-native'

import HomeScreen from '@/features/home/HomeScreen'
import AddNoteScreen from '@/features/addNote/AddNoteScreen'
import NoteDetails from '@/features/noteDetails/NoteDetails'
import FilterModal from '@/modals/FilterModal'
import AuthScreen from '@/features/auth/AuthScreen'

import { CategoriesProvider } from '@/hooks/useCategories'
import { SortProvider, SortKey } from '@/contexts/SortContext'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

export interface Note {
    id: string
    name: string
    comment: string
    rating: number
    image?: string
    images?: string[]
    tags: string[];
    created?: Date
    edited?: Date
    price?: number
    currency?: '€' | '$' | '₴'
    category?: string;
    userId: string;
}

export type NavNote = Omit<Note, 'created' | 'edited'> & { created: string, edited?: string }

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

const noteDetailsOptions: StackNavigationOptions = {
    headerShown: false,
    presentation: 'modal',
    cardStyleInterpolator: ({ current }) => {
        const scale = current.progress.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0.88, 0.95, 1],
            extrapolate: 'clamp',
        })

        const opacity = current.progress.interpolate({
            inputRange: [0, 0.15, 0.4, 1],
            outputRange: [0, 0.3, 0.85, 1],
            extrapolate: 'clamp',
        })

        const blur = current.progress.interpolate({
            inputRange: [0, 0.2, 1],
            outputRange: [10, 3, 0],
            extrapolate: 'clamp',
        })

        return {
            cardStyle: {
                opacity,
                transform: [
                    { scale },
                    {
                        perspective: 1000,
                    },
                ],
                filter: `blur(${blur}px)`,
            },
        }
    },
    transitionSpec: {
        open: {
            animation: 'timing',
            config: {
                duration: 450,
                easing: (t: number) => {
                    return t < 0.5 
                        ? 4 * t * t * t 
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                },
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 350,
                easing: (t: number) => {
                    return t * t * (3 - 2 * t);
                },
            },
        },
    },
}

const AppContent: FC = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E7FF' }}>
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        )
    }

    if (!user) {
        return <AuthScreen />
    }

    return (
        <CategoriesProvider>
            <SortProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={defaultOptions}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="AddNote" component={AddNoteScreen} />
                        <Stack.Screen 
                            name="NoteDetails" 
                            component={NoteDetails}
                            options={noteDetailsOptions}
                        />
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
}

const AppNavigator: FC = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
)

export default AppNavigator
