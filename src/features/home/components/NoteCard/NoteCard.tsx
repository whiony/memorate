import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
    View, Text, Image, TouchableOpacity, StyleSheet,
    Animated,
    Easing
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import type { Swipeable as SwipeableType } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { format, isValid, parseISO } from 'date-fns'
import StarRating from '@/ui/Rating/StarRating'
import DeleteNoteModal from '@/modals/DeleteNoteModal'
import type { Note } from '@/navigation/AppNavigator'
import { styles } from './NoteCard.styles'
import { formatPrice } from '@/utils/formatPrice'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
    note: Note
    onEdit: (n: Note) => void
    onDelete: (id: string) => void
    onPress: (n: Note) => void
}

const NoteCard = forwardRef<SwipeableType, Props>(function NoteCard(
    { note, onEdit, onDelete, onPress },
    ref,
) {
    const swipeableRef = ref as React.RefObject<SwipeableType>

    const [delVisible, setDelVisible] = useState(false)

    let date = ''
    if (note.created) {
        const d =
            typeof note.created === 'string'
                ? parseISO(note.created)
                : new Date(note.created)
        if (isValid(d)) date = format(d, 'MMM dd')
    }

    const priceDisplay =
        note.price && note.price > 0 ? formatPrice(note.price) : ''

    const closeSwipe = () => {
        swipeableRef.current?.close()
    }

    const renderRightActions = () => (
        <View style={styles.actions}>
            <TouchableOpacity
                onPress={() => {
                    closeSwipe();
                    onEdit(note);
                }}
                style={styles.actionButton}
            >
                <BlurView intensity={100} tint="light" style={styles.editButton}>
                    <LinearGradient
                        colors={[
                            'rgba(99, 102, 241, 0.3)', 
                            'rgba(129, 140, 248, 0.2)',
                            'rgba(165, 180, 252, 0.15)'
                        ]}
                        style={styles.gradientOverlay}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                    <Ionicons name="create-outline" size={26} color="#fff" style={styles.editIcon} />
                </BlurView>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    closeSwipe();
                    setDelVisible(true);
                }}
                style={styles.actionButton}
            >
                <BlurView intensity={100} tint="light" style={styles.deleteButton}>
                    <LinearGradient
                        colors={[
                            'rgba(248, 113, 113, 0.35)', 
                            'rgba(239, 68, 68, 0.25)',
                            'rgba(220, 38, 38, 0.15)'
                        ]}
                        style={styles.gradientOverlay}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                    <Ionicons name="trash-outline" size={26} color="#fff" />
                </BlurView>
            </TouchableOpacity>

        </View>
    )

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(20)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <>
            <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: 20 }]}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        closeSwipe();
                        onPress(note);
                    }}
                >
                    <Animated.View style={[
                        styles.cardWrapper, 
                        { 
                            opacity: fadeAnim, 
                            transform: [
                                { translateY: translateYAnim },
                                { scale: scaleAnim }
                            ] 
                        }
                    ]}>
                        <BlurView intensity={120} tint="light" style={styles.cardBackground}>
                            <LinearGradient
                                colors={[
                                    'rgba(255,255,255,0.35)', 
                                    'rgba(255,255,255,0.15)', 
                                    'rgba(99, 102, 241, 0.08)'
                                ]}
                                style={StyleSheet.absoluteFillObject}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                        </BlurView>

                        <View style={styles.cardContent}>
                            <View style={styles.mainRow}>
                                {note.image && (
                                    <View style={styles.imageWrapper}>
                                        <Image source={{ uri: note.image }} style={styles.image} resizeMode="cover" />
                                    </View>
                                )}
                                
                                <View style={styles.textContent}>
                                    <View>
                                        <Text style={styles.title} numberOfLines={1}>
                                            {note.name}
                                        </Text>
                                        {!!note.comment && (
                                            <Text style={styles.comment} numberOfLines={2}>
                                                {note.comment}
                                            </Text>
                                        )}
                                    </View>

                                    <View style={styles.ratingSection}>
                                        <StarRating rating={note.rating} disabled cardList />
                                        {!!priceDisplay && (
                                            <Text style={styles.price}>
                                                {note.currency}{priceDisplay}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                            
                            {note.tags?.length > 0 && (
                                <View style={styles.tagsRow}>
                                    {note.tags.slice(0, 2).map((tag: string) => (
                                        <View key={tag} style={styles.tagPill}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                    {note.tags.length > 2 && (
                                        <Text style={styles.moreTagsText}>+{note.tags.length - 2}</Text>
                                    )}
                                </View>
                            )}
                        </View>

                    </Animated.View>
                </TouchableOpacity>
            </Swipeable >

            <DeleteNoteModal
                visible={delVisible}
                noteName={note.name}
                onCancel={() => setDelVisible(false)}
                onConfirm={() => {
                    setDelVisible(false)
                    onDelete(note.id)
                }}
            />
        </>
    )
})

export default NoteCard
