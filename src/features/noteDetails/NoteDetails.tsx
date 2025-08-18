import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Modal,
    Pressable,
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'

import StarRating from '@/ui/Rating/StarRating'
import type { RootStackParamList, NavNote, Note } from '@/navigation/AppNavigator'
import DeleteNoteModal from '@/modals/DeleteNoteModal'
import { deleteFromCloudinary } from '@/utils/deleteFromCloudinary'
import { deleteDoc, doc as firestoreDoc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import { formatPrice } from '@/utils/formatPrice'
import { styles } from './NoteDetails.styles'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'

type NoteDetailsRouteProp = RouteProp<RootStackParamList, 'NoteDetails'>
type NoteDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'NoteDetails'>

const NoteDetails: FC = () => {
    const navigation = useNavigation<NoteDetailsNavigationProp>()
    const route = useRoute<NoteDetailsRouteProp>()
    const navNote = route.params.note as NavNote

    const [note, setNote] = useState<Note>({
        ...navNote,
        created: new Date(navNote.created),
        edited: navNote.edited ? new Date(navNote.edited) : undefined,
    })
    const [delVisible, setDelVisible] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false)

    useEffect(() => {
        const ref = firestoreDoc(firestore, 'reviews', navNote.id)
        const unsub = onSnapshot(ref, snap => {
            const data = snap.data()
            if (data) {
                setNote({
                    id: snap.id,
                    name: data.name,
                    comment: data.comment,
                    rating: data.rating,
                    image: data.image,
                    tags: data.tags ?? (data.category ? [data.category] : []),
                    created: data.created.toDate(),
                    edited: data.edited?.toDate(),
                    price: data.price,
                    currency: data.currency,
                })
            }
        })
        return () => unsub()
    }, [navNote.id])

    const formattedCreatedDate = useMemo(
        () => format(note.created!, 'MMMM dd, yyyy'),
        [note.created],
    )

    const formattedEditedDate = useMemo(() => {
        if (!note.edited || !note.created) return null

        const createdTime = note.created.getTime()
        const editedTime = note.edited.getTime()

        if (Math.abs(editedTime - createdTime) > 60000) {
            return format(note.edited, 'MMMM dd, yyyy')
        }

        return null
    }, [note.edited, note.created])

    const priceDisplay = note.price && note.price > 0
        ? `${note.currency}${formatPrice(note.price)}`
        : '—'

    const handleGoBack = useCallback(() => navigation.goBack(), [navigation])
    const handleEdit = useCallback(() => {
        if (!note.created) return

        navigation.navigate('AddNote', {
            note: {
                ...note,
                created: note.created.toISOString(),
                edited: note.edited?.toISOString(),
            },
        })
    }, [navigation, note])

    const handleDelete = useCallback(async () => {
        setDelVisible(false)
        if (note.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image)
        }
        await deleteDoc(firestoreDoc(firestore, 'reviews', note.id))
        navigation.goBack()
    }, [note, navigation])
    const openDeleteModal = useCallback(() => setDelVisible(true), [])

    return (
        <LinearGradient
            colors={['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.side, styles.sideLeft]}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.headerTitle} ellipsizeMode="tail">
                        Note Details
                    </Text>

                    <View style={[styles.side, styles.sideRight]}>
                        <TouchableOpacity
                            onPress={() => setMenuVisible(true)}
                            style={styles.menuButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="ellipsis-vertical" size={22} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={menuVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setMenuVisible(false)}
                    >
                        <Pressable
                            style={StyleSheet.absoluteFill}
                            onPress={() => setMenuVisible(false)}
                        >
                            <View style={styles.popupWrapper}>
                                <View style={styles.popupMenu}>
                                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                                        setMenuVisible(false)
                                        handleEdit()
                                    }}>
                                        <Text style={styles.menuText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.menuItem} onPress={() => {
                                        setMenuVisible(false)
                                        openDeleteModal()
                                    }}>
                                        <Text style={[styles.menuText, { color: '#E53935' }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.noteCard}>
                        {note.image && (
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: note.image }} style={styles.image} />
                            </View>
                        )}

                        <BlurView intensity={120} tint="light" style={styles.noteBody}>
                            <LinearGradient
                                colors={[
                                    'rgba(255,255,255,0.6)', 
                                    'rgba(255,255,255,0.4)', 
                                    'rgba(99, 102, 241, 0.1)'
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <View style={styles.noteContent}>
                                {note.tags?.length ? (
                                    <View style={styles.tagContainer}>
                                        {note.tags.map((tag: string) => (
                                            <BlurView
                                                key={tag}
                                                intensity={100}
                                                tint="light"
                                                style={styles.tagPill}
                                            >
                                                <LinearGradient
                                                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
                                                    style={StyleSheet.absoluteFill}
                                                />
                                                <Text style={styles.tagText}>{tag}</Text>
                                            </BlurView>
                                        ))}
                                    </View>
                                ) : null}

                                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{note.name}</Text>

                                <View style={styles.inlineRow}>
                                    <StarRating rating={note.rating} disabled />
                                    {!!note.price && <Text style={styles.price}>{priceDisplay}</Text>}
                                </View>

                                {!!note.comment && <Text style={styles.comment}>{note.comment}</Text>}

                                <View style={styles.datesContainer}>
                                    <Text style={styles.date}>Added on {formattedCreatedDate}</Text>
                                    {formattedEditedDate && (
                                        <Text style={styles.editedDate}>Last edited on {formattedEditedDate}</Text>
                                    )}
                                </View>
                            </View>
                        </BlurView>
                    </View>
                </ScrollView>

                <DeleteNoteModal
                    visible={delVisible}
                    noteName={note.name}
                    onCancel={handleGoBack}
                    onConfirm={handleDelete}
                />
            </SafeAreaView>
        </LinearGradient>
    )
}

export default NoteDetails
