import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import { deleteUser } from 'firebase/auth'
import type { RootStackParamList } from '@/navigation/AppNavigator'
import { styles } from './Settings.styles'

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>()
    const { user, logout } = useAuth()

    const handleGoBack = () => navigation.goBack()

    const handleLogout = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout()
                        } catch (error) {
                            Alert.alert('Error', 'Failed to sign out')
                        }
                    }
                }
            ]
        )
    }

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This action cannot be undone. All your reviews and data will be permanently deleted.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete Account',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert(
                            'Are you absolutely sure?',
                            'This will permanently delete your account and all associated data.',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Yes, Delete',
                                    style: 'destructive',
                                    onPress: async () => {
                                        if (!user) return
                                        
                                        try {
                                            await deleteUser(user)
                                        } catch (error: any) {
                                            if (error.code === 'auth/requires-recent-login') {
                                                Alert.alert(
                                                    'Authentication Required',
                                                    'For security reasons, please log out and log back in, then try deleting your account again.',
                                                    [{ text: 'OK', onPress: handleLogout }]
                                                )
                                            } else {
                                                Alert.alert('Error', 'Failed to delete account. Please try again.')
                                            }
                                        }
                                    }
                                }
                            ]
                        )
                    }
                }
            ]
        )
    }

    return (
        <LinearGradient
            colors={['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerTitle}>Settings</Text>
                    
                    <View style={styles.placeholder} />
                </View>

                <View style={styles.content}>
                    <BlurView intensity={100} tint="light" style={styles.settingsCard}>
                        <LinearGradient
                            colors={[
                                'rgba(255,255,255,0.4)',
                                'rgba(255,255,255,0.2)',
                                'rgba(99, 102, 241, 0.1)'
                            ]}
                            style={styles.cardGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                        
                        <View style={styles.settingsContent}>
                            <Text style={styles.sectionTitle}>Account</Text>
                            
                            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="log-out-outline" size={24} color="#6366F1" />
                                </View>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>Sign Out</Text>
                                    <Text style={styles.settingSubtitle}>Sign out of your account</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>

                            <View style={styles.separator} />

                            <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
                                <View style={[styles.settingIcon, styles.dangerIcon]}>
                                    <Ionicons name="trash-outline" size={24} color="#E53935" />
                                </View>
                                <View style={styles.settingInfo}>
                                    <Text style={[styles.settingTitle, styles.dangerText]}>Delete Account</Text>
                                    <Text style={styles.settingSubtitle}>Permanently delete your account and all data</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SettingsScreen