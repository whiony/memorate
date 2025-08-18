import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import type { RootStackParamList } from '@/navigation/AppNavigator'
import { styles } from './Profile.styles'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>()
    const { user } = useAuth()
    const [noteCount, setNoteCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNoteCount = async () => {
            if (!user) return
            
            try {
                const q = query(
                    collection(firestore, 'reviews'),
                    where('userId', '==', user.uid)
                )
                const snapshot = await getDocs(q)
                setNoteCount(snapshot.size)
            } catch (error) {
                console.error('Error fetching note count:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNoteCount()
    }, [user])

    const handleGoBack = () => navigation.goBack()
    const handleSettings = () => navigation.navigate('Settings')

    if (!user) {
        return null
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
                    
                    <Text style={styles.headerTitle}>Profile</Text>
                    
                    <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <BlurView intensity={100} tint="light" style={styles.profileCard}>
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
                        
                        <View style={styles.profileInfo}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Ionicons name="person" size={48} color="#6366F1" />
                                </View>
                            </View>

                            <View style={styles.userInfo}>
                                <Text style={styles.email}>{user.email}</Text>
                                <Text style={styles.joinDate}>
                                    Member since {user.metadata.creationTime ? 
                                        new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        }) : 'Unknown'}
                                </Text>
                            </View>
                        </View>
                    </BlurView>

                    <BlurView intensity={100} tint="light" style={styles.statsCard}>
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
                        
                        <View style={styles.statsContent}>
                            <View style={styles.statItem}>
                                <View style={styles.statIconContainer}>
                                    <Ionicons name="document-text" size={32} color="#6366F1" />
                                </View>
                                <View style={styles.statInfo}>
                                    <Text style={styles.statNumber}>
                                        {loading ? '...' : noteCount}
                                    </Text>
                                    <Text style={styles.statLabel}>
                                        {noteCount === 1 ? 'Review' : 'Reviews'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </BlurView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default ProfileScreen