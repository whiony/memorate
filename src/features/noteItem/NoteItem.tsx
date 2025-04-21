import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import { useNavigation, RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import StarRating from '../../components/StarRating'
import type { RootStackParamList } from '../../navigation/AppNavigator'
import { categoryColors } from '../../utils/categoryColors'
import { styles } from './NoteItem.styles'
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary'
import { deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '../../services/firebaseConfig'
import DeleteNoteModal from '../../components/DeleteNoteModal'

export type NoteItemNavigationProp = StackNavigationProp<
    RootStackParamList,
    'NoteItem'
>
export type NoteItemRouteProp = RouteProp<RootStackParamList, 'NoteItem'>

interface Props {
    route: NoteItemRouteProp
}

const NoteItem: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<NoteItemNavigationProp>()
    const { note } = route.params
    const [delVisible, setDelVisible] = useState(false)

    const date = note.created
        ? format(new Date(note.created), 'MMMM dd, yyyy')
        : ''
    const pillColor = categoryColors[note.category] || '#CCC'

    const onConfirmDelete = async () => {
        setDelVisible(false)
        if (note.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image)
        }
        await deleteDoc(doc(firestore, 'reviews', note.id))
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text
                    style={styles.headerTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {note.name}
                </Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddNote', { note })}
                    >
                        <Ionicons name="create-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setDelVisible(true)}
                        style={styles.headerIcon}
                    >
                        <Ionicons name="trash-outline" size={24} color="#E53935" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    {note.image ? (
                        <Image source={{ uri: note.image }} style={styles.image} />
                    ) : null}

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name:</Text>
                        <Text
                            style={styles.value}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {note.name}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>{date}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Price:</Text>
                        <Text style={styles.value}>
                            {note.price ? `${note.currency}${note.price}` : '—'}
                        </Text>
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
                        {note.category ? (
                            <View style={[styles.pill, { backgroundColor: pillColor }]}>
                                <Text style={styles.pillText}>{note.category}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </ScrollView>

            <DeleteNoteModal
                visible={delVisible}
                noteName={note.name}
                onCancel={() => setDelVisible(false)}
                onConfirm={onConfirmDelete}
            />
        </SafeAreaView>
    )
}

export default NoteItem
