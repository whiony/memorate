import React, { forwardRef, useState } from 'react'
import {
    View, Text, Image, TouchableOpacity,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import type { Swipeable as SwipeableType } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { format, isValid, parseISO } from 'date-fns'
import StarRating from '@/ui/Rating/StarRating'
import DeleteNoteModal from '@/modals/DeleteNoteModal'
import { useCategories } from '@/hooks/useCategories'
import type { Note } from '@/navigation/AppNavigator'
import { styles } from './NoteCard.styles'
import { formatPrice } from '@/utils/formatPrice'

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
    const { categories } = useCategories()

    let date = ''
    if (note.created) {
        const d =
            typeof note.created === 'string'
                ? parseISO(note.created)
                : new Date(note.created)
        if (isValid(d)) date = format(d, 'MMM dd')
    }

    const catObj = categories.find(c => c.name === note.category)
    const bgColor = catObj?.color ?? '#E0E0E0'

    const priceDisplay =
        note.price && note.price > 0 ? formatPrice(note.price) : ''

    const closeSwipe = () => {
        swipeableRef.current?.close()
    }

    const renderRightActions = () => (
        <View style={styles.actions}>
            <TouchableOpacity
                onPress={() => {
                    closeSwipe()
                    onEdit(note)
                }}
                style={[styles.actionButton, styles.editAction]}
            >
                <Ionicons name="create-outline" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    closeSwipe()
                    setDelVisible(true)
                }}
                style={[styles.actionButton, styles.deleteAction]}
            >
                <Ionicons name="trash-outline" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
    )

    return (
        <>
            <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        closeSwipe()
                        onPress(note)
                    }}
                >
                    <View style={[styles.card, { backgroundColor: bgColor }]}>
                        <View style={styles.mainRow}>
                            {note.image && (
                                <View style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri: note.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                            )}
                            <View style={styles.mainContent}>
                                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                                    {note.name}
                                </Text>
                                <Text style={styles.comment} numberOfLines={3}>
                                    {note.comment}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.footer}>
                            <Text style={styles.date}>{date}</Text>
                            <View style={styles.centerStars}>
                                <StarRating rating={note.rating} disabled cardList />
                            </View>
                            {priceDisplay ? (
                                <Text style={styles.price}>
                                    {note.currency}
                                    {priceDisplay}
                                </Text>
                            ) : (
                                <View style={styles.pricePlaceholder} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>

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
