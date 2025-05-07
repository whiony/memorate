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
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
                    {note.name}
                </Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDeleteModal} style={styles.headerIcon}>
                        <Ionicons name="trash-outline" size={24} color="#E53935" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {note.image && <Image source={{ uri: note.image }} style={styles.image} />}

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">
                            {note.name}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>{formattedDate}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Price:</Text>
                        <Text style={styles.value}>{priceDisplay}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.label}>Rating:</Text>
                        <StarRating rating={note.rating} disabled cardList />
                    </View>

                    <View style={styles.commentContainer}>
                        <Text style={styles.label}>Comment:</Text>
                        <Text style={styles.commentText}>
                            {note.comment || 'No comment'}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Category:</Text>
                        {note.category && (
                            <View style={[styles.pill, { backgroundColor: pillColor }]}>
                                <Text style={styles.pillText}>{note.category}</Text>
                            </View>
                        )}
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
