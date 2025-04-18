import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import StarRating from '../../components/StarRating';
import DeleteNoteModal from '../../components/DeleteNoteModal';
import { categoryColors } from '../../utils/categoryColors';
import { Note } from '../../navigation/AppNavigator';
import { styles } from './NoteItem.styles';

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
    const [delVisible, setDelVisible] = useState(false);
    const date = note.created ? format(new Date(note.created), 'MMM dd') : '';
    const bg = categoryColors[note.category] || '#E0E0E0';

    const renderActions = () => (
        <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(note)} style={styles.actionButton}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDelVisible(true)} style={styles.actionButton}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <Swipeable renderRightActions={renderActions}>
                <View style={[styles.card, { backgroundColor: bg }]}>
                    <View style={styles.mainRow}>
                        {note.image && (
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: note.image }} style={styles.image} />
                            </View>
                        )}
                        <View style={[styles.mainContent, !note.image ? { marginLeft: 16 } : {}]}>
                            <Text style={styles.title}>{note.name}</Text>
                            <Text numberOfLines={2} style={styles.comment}>{note.comment}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.footer}>
                        <Text style={styles.date}>{date}</Text>
                        <View style={styles.stars}>
                            <StarRating rating={note.rating} disabled cardList />
                        </View>
                        {note.price != null && <Text style={styles.price}>{note.currency}{note.price}</Text>}
                    </View>
                </View>
            </Swipeable>
            <DeleteNoteModal
                visible={delVisible}
                noteName={note.name}
                onCancel={() => setDelVisible(false)}
                onConfirm={() => { setDelVisible(false); onDelete(note.id); }}
            />
        </>
    );
};

export default NoteItem;