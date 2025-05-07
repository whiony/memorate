import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.side}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
                    Note Details
                </Text>

                <View style={styles.side}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDeleteModal} style={styles.headerIcon}>
                        <Ionicons name="trash-outline" size={24} color="#E53935" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>

                    {note.image ? (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: note.image }} style={styles.image} />
                            <View style={styles.textOnImage}>
                                <BlurView intensity={30} tint="light" style={styles.blurOverlay}>
                                    <LinearGradient
                                        colors={['rgba(180,180,180,0.2)', 'rgba(255,255,255,0.05)']}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                    {note.category && (
                                        <View style={[styles.categoryPill, { backgroundColor: pillColor }]}>
                                            <Text style={styles.categoryPillText}>{note.category}</Text>
                                        </View>
                                    )}
                                    <Text style={styles.titleOnImage}>{note.name}</Text>
                                </BlurView>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.noImageHeader}>
                            {note.category && (
                                <View style={[styles.categoryPill, { backgroundColor: pillColor }]}>
                                    <Text style={styles.categoryPillText}>{note.category}</Text>
                                </View>
                            )}
                            <Text style={styles.titleNoImage}>{note.name}</Text>
                        </View>
                    )}

                    <View style={styles.body}>
                        <View style={styles.inlineRow}>
                            <StarRating rating={note.rating} disabled cardList />
                            <Text style={styles.ratingText}>{note.rating.toFixed(1)}/5.0</Text>
                        </View>

                        {note.price && note.price > 0 && (
                            <Text style={styles.price}>{priceDisplay}</Text>
                        )}

                        {!!note.comment && (
                            <Text style={styles.comment}>{note.comment}</Text>
                        )}

                        <Text style={styles.date}>Added on {formattedDate}</Text>
                    </View>
                </View>
            </ScrollView>


            <DeleteNoteModal
                visible={delVisible}
                noteName={note.name}
                onCancel={handleGoBack}
                onConfirm={handleDelete}
            />
        </SafeAreaView>
    )
}

export default NoteDetails
