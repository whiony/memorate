import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Switch,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { lightTheme, darkTheme } from '@/theme/colors'
import { deleteUser } from 'firebase/auth'
import type { RootStackParamList } from '@/navigation/AppNavigator'
import { styles } from './Settings.styles'

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>()
    const { user, logout } = useAuth()
    const { theme, toggleTheme, isDark } = useTheme()
    const colors = isDark ? darkTheme : lightTheme

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
            colors={colors.background}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
                    
                    <View style={styles.placeholder} />
                </View>

                <View style={styles.content}>
                    <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.settingsCard}>
                        <LinearGradient
                            colors={colors.cardBodyGradient}
                            style={styles.cardGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                        
                        <View style={styles.settingsContent}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
                            
                            <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={colors.accent} />
                                </View>
                                <View style={styles.settingInfo}>
                                    <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Switch between light and dark theme</Text>
                                </View>
                                <Switch
                                    value={isDark}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: colors.textMuted, true: colors.accent }}
                                    thumbColor={isDark ? colors.background[0] : '#f4f3f4'}
                                />
                            </TouchableOpacity>

                            <View style={[styles.separator, { backgroundColor: colors.border }]} />

                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
                            
                            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
                                <View style={styles.settingIcon}>
                                    <Ionicons name="log-out-outline" size={24} color={colors.accent} />
                                </View>
                                <View style={styles.settingInfo}>
                                    <Text style={[styles.settingTitle, { color: colors.text }]}>Sign Out</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Sign out of your account</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                            </TouchableOpacity>

                            <View style={[styles.separator, { backgroundColor: colors.border }]} />

                            <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
                                <View style={[styles.settingIcon, styles.dangerIcon]}>
                                    <Ionicons name="trash-outline" size={24} color={colors.danger} />
                                </View>
                                <View style={styles.settingInfo}>
                                    <Text style={[styles.settingTitle, { color: colors.danger }]}>Delete Account</Text>
                                    <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Permanently delete your account and all data</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SettingsScreen