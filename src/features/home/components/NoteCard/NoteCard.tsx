import React, { forwardRef, useState } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import type { Swipeable as SwipeableType } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { format, isValid, parseISO } from 'date-fns'
import StarRating from '@ui/Rating/StarRating'
import DeleteNoteModal from '@modals/DeleteNoteModal'
import { categoryColors } from '@utils/categoryColors'
import type { Note } from '@navigation/AppNavigator'
import { styles } from './NoteCard.styles'
import { formatPrice } from '@utils/formatPrice'

type Props = {
    note: Note
    onEdit: (n: Note) => void
    onDelete: (id: string) => void
    onPress: (n: Note) => void
}

const NoteCard = forwardRef<SwipeableType, Props>(
    ({ note, onEdit, onDelete, onPress }, swipeableRef) => {
        const [delVisible, setDelVisible] = useState(false)
        const raw = note.created
        let date = ''
        if (raw) {
            const d = typeof raw === 'string' ? parseISO(raw) : new Date(raw)
            if (isValid(d)) date = format(d, 'MMM dd')
        }

        const bgColor = note.category
            ? categoryColors[note.category] || '#E0E0E0'
            : '#E0E0E0'

        const priceDisplay = note.price && note.price > 0
            ? formatPrice(note.price)
            : ''

        const renderRightActions = () => (
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={() => {
                        ; (swipeableRef as React.RefObject<SwipeableType>).current?.close()
                        onEdit(note)
                    }}
                    style={[styles.actionButton, styles.editAction]}
                >
                    <Ionicons name="create-outline" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        ; (swipeableRef as React.RefObject<SwipeableType>).current?.close()
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
                            ; (swipeableRef as React.RefObject<SwipeableType>).current?.close()
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
                                    <Text
                                        style={styles.title}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {note.name}
                                    </Text>
                                    <Text numberOfLines={3} style={styles.comment}>
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
                                {note.price && note.price > 0 ? (
                                    <Text style={styles.price}>
                                        {note.currency}{priceDisplay}
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
    }
)

export default NoteCard
