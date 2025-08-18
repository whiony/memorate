import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'
import { lightTheme, darkTheme } from '@/theme/colors'
import { createStyles } from './EmptyState.styles'

interface EmptyStateProps {
    onAddNote: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote }) => {
    const { isDark } = useTheme()
    const colors = isDark ? darkTheme : lightTheme
    const styles = createStyles(colors)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.emptyCard}
                onPress={onAddNote}
                activeOpacity={0.7}
            >
                <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={styles.cardBlur}>
                    <LinearGradient
                        colors={colors.cardBodyGradient}
                        style={styles.cardGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                    
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="add" size={48} color={colors.accent} />
                        </View>
                        
                        <Text style={[styles.title, { color: colors.text }]}>Add your first review</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Start building your collection of memories
                        </Text>
                    </View>
                </BlurView>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyState