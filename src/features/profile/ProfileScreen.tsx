import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { lightTheme, darkTheme } from '@/theme/colors'
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import type { RootStackParamList } from '@/navigation/AppNavigator'
import { styles } from './Profile.styles'

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>()
    const { user } = useAuth()
    const { isDark } = useTheme()
    const colors = isDark ? darkTheme : lightTheme
    const [noteCount, setNoteCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [displayName, setDisplayName] = useState('')
    const [isEditingName, setIsEditingName] = useState(false)
    const [tempName, setTempName] = useState('')
    const [avgRating, setAvgRating] = useState(0)
    const [topTag, setTopTag] = useState('')
    const [reviewStreak, setReviewStreak] = useState(0)

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return

            try {
                const q = query(
                    collection(firestore, 'reviews'),
                    where('userId', '==', user.uid)
                )
                const snapshot = await getDocs(q)
                const reviews = snapshot.docs.map(doc => doc.data())
                setNoteCount(snapshot.size)

                if (reviews.length > 0) {
                    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0)
                    setAvgRating(totalRating / reviews.length)

                    const tagCounts: { [key: string]: number } = {}
                    reviews.forEach(review => {
                        const tags = review.tags || []
                        tags.forEach((tag: string) => {
                            tagCounts[tag] = (tagCounts[tag] || 0) + 1
                        })
                    })
                    const mostUsedTag = Object.entries(tagCounts).sort(([,a], [,b]) => b - a)[0]
                    setTopTag(mostUsedTag ? mostUsedTag[0] : '')

                    const sortedReviews = reviews
                        .filter(r => r.created)
                        .sort((a, b) => {
                            const dateA = a.created.toDate ? a.created.toDate() : new Date(a.created)
                            const dateB = b.created.toDate ? b.created.toDate() : new Date(b.created)
                            return dateB.getTime() - dateA.getTime()
                        })

                    let streak = 0
                    let currentDate = new Date()
                    currentDate.setHours(0, 0, 0, 0)

                    for (const review of sortedReviews) {
                        const reviewDate = review.created.toDate ? review.created.toDate() : new Date(review.created)
                        reviewDate.setHours(0, 0, 0, 0)
                        
                        const daysDiff = Math.floor((currentDate.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24))
                        
                        if (daysDiff === streak) {
                            streak++
                        } else if (daysDiff === streak + 1) {
                            streak++
                        } else {
                            break
                        }
                    }
                    setReviewStreak(streak)
                }

                const userDocRef = doc(firestore, 'users', user.uid)
                const userDoc = await getDoc(userDocRef)

                if (userDoc.exists() && userDoc.data().displayName) {
                    setDisplayName(userDoc.data().displayName)
                } else {
                    const defaultName = user.email?.split('@')[0] || 'User'
                    setDisplayName(defaultName)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [user])

    const handleGoBack = () => navigation.goBack()
    const handleSettings = () => navigation.navigate('Settings')

    const handleEditName = () => {
        setTempName(displayName)
        setIsEditingName(true)
    }

    const handleSaveName = async () => {
        if (!user || !tempName.trim()) return

        try {
            const newName = tempName.trim()

            const userDocRef = doc(firestore, 'users', user.uid)
            await setDoc(userDocRef, { displayName: newName }, { merge: true })

            setDisplayName(newName)
            setIsEditingName(false)
        } catch (error) {
            console.error('Error updating name:', error)
            Alert.alert('Error', 'Failed to update name. Please try again.')
        }
    }

    const handleCancelEdit = () => {
        setTempName('')
        setIsEditingName(false)
    }

    if (!user) {
        return null
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

                    <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>

                    <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.profileCard}>
                        <LinearGradient
                            colors={colors.cardBodyGradient}
                            style={styles.cardGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />

                        <View style={styles.profileInfo}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Ionicons name="person" size={48} color={colors.accent} />
                                </View>
                            </View>

                            <View style={styles.userInfo}>
                                <View style={styles.nameContainer}>
                                    {isEditingName ? (
                                        <View style={styles.nameEditContainer}>
                                            <TextInput
                                                style={[styles.nameInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.cardBackground }]}
                                                value={tempName}
                                                onChangeText={setTempName}
                                                placeholder="Enter your name"
                                                placeholderTextColor={colors.textMuted}
                                                maxLength={30}
                                                autoFocus
                                            />
                                            <View style={styles.nameEditActions}>
                                                <TouchableOpacity onPress={handleSaveName} style={styles.nameActionButton}>
                                                    <Ionicons name="checkmark" size={20} color={colors.success} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleCancelEdit} style={styles.nameActionButton}>
                                                    <Ionicons name="close" size={20} color={colors.danger} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={styles.nameDisplayContainer}>
                                            <Text style={[styles.displayName, { color: colors.text }]}>{displayName}</Text>
                                            <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
                                                <Ionicons name="pencil" size={16} color={colors.accent} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>

                                <Text style={[styles.email, { color: colors.textSecondary }]}>{user.email}</Text>
                                <Text style={[styles.joinDate, { color: colors.textMuted }]}>
                                    Member since {user.metadata.creationTime ?
                                        new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        }) : 'Unknown'}
                                </Text>
                            </View>
                        </View>
                    </BlurView>

                    <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.statsCard}>
                        <LinearGradient
                            colors={colors.cardBodyGradient}
                            style={styles.cardGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />

                        <View style={styles.statsContent}>
                            <View style={styles.statItem}>
                                <View style={styles.statIconContainer}>
                                    <Ionicons name="document-text" size={32} color={colors.accent} />
                                </View>
                                <View style={styles.statInfo}>
                                    <Text style={[styles.statNumber, { color: colors.text }]}>
                                        {loading ? '...' : noteCount}
                                    </Text>
                                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                                        {noteCount === 1 ? 'Review' : 'Reviews'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </BlurView>

                    {noteCount > 0 && (
                        <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.compactStatsCard}>
                            <LinearGradient
                                colors={colors.cardBodyGradient}
                                style={styles.cardGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />

                            <View style={styles.compactStatsContent}>
                                <View style={styles.compactStatItem}>
                                    <Ionicons name="star" size={20} color={colors.warning} />
                                    <Text style={[styles.compactStatNumber, { color: colors.text }]}>
                                        {loading ? '...' : avgRating.toFixed(1)}
                                    </Text>
                                    <Text style={[styles.compactStatLabel, { color: colors.textMuted }]}>Avg Rating</Text>
                                </View>

                                <View style={styles.compactStatItem}>
                                    <Ionicons name="pricetag" size={20} color={colors.accent} />
                                    <Text style={[styles.compactStatNumber, { color: colors.text }]}>
                                        {loading ? '...' : (topTag || 'None')}
                                    </Text>
                                    <Text style={[styles.compactStatLabel, { color: colors.textMuted }]}>Top Category</Text>
                                </View>

                                <View style={styles.compactStatItem}>
                                    <Ionicons name="flame" size={20} color={colors.warning} />
                                    <Text style={[styles.compactStatNumber, { color: colors.text }]}>
                                        {loading ? '...' : reviewStreak}
                                    </Text>
                                    <Text style={[styles.compactStatLabel, { color: colors.textMuted }]}>Day Streak</Text>
                                </View>
                            </View>
                        </BlurView>
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default ProfileScreen