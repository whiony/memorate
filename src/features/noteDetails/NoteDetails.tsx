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
import { useCategories } from '@/hooks/useCategories'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import CategoryFilter from '../home/components/CategoryFilter/CategoryFilter'

type NoteDetailsRouteProp = RouteProp<RootStackParamList, 'NoteDetails'>
type NoteDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'NoteDetails'>

const NoteDetails: FC = () => {
    const navigation = useNavigation<NoteDetailsNavigationProp>()
    const route = useRoute<NoteDetailsRouteProp>()
    const navNote = route.params.note as NavNote

    const [note, setNote] = useState<Note>({
        ...navNote,
        created: new Date(navNote.created),
    })
    const [delVisible, setDelVisible] = useState(false)
    const { categories } = useCategories()

    const [menuVisible, setMenuVisible] = useState(false)
    const toggleMenu = () => setMenuVisible(v => !v)

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
                    category: data.category,
                    created: data.created.toDate(),
                    price: data.price,
                    currency: data.currency,
                })
            }
        })
        return () => unsub()
    }, [navNote.id])

    const formattedDate = useMemo(
        () => format(note.created!, 'MMMM dd, yyyy'),
        [note.created],
    )

    const catObj = categories.find(c => c.name === note.category)
    const pillColor = catObj?.color ?? '#CCC'

    const priceDisplay = note.price && note.price > 0
        ? `${note.currency}${formatPrice(note.price)}`
        : '—'

    const handleGoBack = useCallback(() => navigation.goBack(), [navigation])
    const handleEdit = useCallback(() => {
        navigation.navigate('AddNote', {
            note: { ...note, created: note.created!.toISOString() },
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
            colors={['#FFE29F', '#FFA99F', '#FF719A', '#A18CD1']}
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

                        <BlurView intensity={100} tint="light" style={styles.noteBody}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']}
                                style={StyleSheet.absoluteFill}
                            />

                            <View style={styles.noteContent}>
                                {catObj && (
                                    <View style={{
                                        alignSelf: 'flex-start',
                                        marginBottom: 12,
                                        borderRadius: 18,
                                        overflow: 'hidden',
                                    }}>
                                        <BlurView
                                            intensity={100}
                                            tint="light"
                                            style={{
                                                paddingHorizontal: 20,
                                                paddingVertical: 6,
                                                backgroundColor: `${pillColor}66`,
                                                borderRadius: 18,
                                                borderWidth: 1,
                                                borderColor: 'rgba(255,255,255,0.5)',
                                            }}
                                        >
                                            <LinearGradient
                                                colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>
                                                {note.category}
                                            </Text>
                                        </BlurView>
                                    </View>
                                )}

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{note.name}</Text>
                                    {!!note.price && <Text style={styles.price}>{priceDisplay}</Text>}
                                </View>

                                <View style={styles.inlineRow}>
                                    <StarRating rating={note.rating} disabled cardList />
                                    <Text style={styles.ratingText}>{note.rating.toFixed(1)}</Text>
                                </View>

                                {!!note.comment && <Text style={styles.comment}>{note.comment}</Text>}

                                <Text style={styles.date}>Added on {formattedDate}</Text>
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
