import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './EmptyState.styles'

interface EmptyStateProps {
    onAddNote: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.emptyCard}
                onPress={onAddNote}
                activeOpacity={0.7}
            >
                <BlurView intensity={80} tint="light" style={styles.cardBlur}>
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
                    
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="add" size={48} color="#6366F1" />
                        </View>
                        
                        <Text style={styles.title}>Add your first review</Text>
                        <Text style={styles.subtitle}>
                            Start building your collection of memories
                        </Text>
                    </View>
                </BlurView>
            </TouchableOpacity>
        </View>
    )
}

export default EmptyState