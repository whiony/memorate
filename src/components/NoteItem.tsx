import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Note } from '../navigation/AppNavigator';
import { styles } from '../styles/NoteItem.styles';
import { format } from 'date-fns';

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (noteId: string) => void;
    visibleMenuId: string | null;
    setVisibleMenuId: (id: string | null) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete, visibleMenuId, setVisibleMenuId }) => {
    const formattedDate = note.created ? format(new Date(note.created), 'MMM dd') : '';

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: note.image }} style={styles.image} />
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.menuContainer}>
                        <Menu
                            visible={visibleMenuId === note.id}
                            onRequestClose={() => setVisibleMenuId(null)}
                            anchor={
                                <TouchableOpacity onPress={() => setVisibleMenuId(note.id)} style={styles.menuButton}>
                                    <Text style={styles.menuText}>⋮</Text>
                                </TouchableOpacity>
                            }>
                            <MenuItem onPress={() => { setVisibleMenuId(null); onEdit(note); }}>Edit</MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => { setVisibleMenuId(null); onDelete(note.id); }}>Delete</MenuItem>
                        </Menu>
                    </View>

                    <Text style={styles.title}>{note.name}</Text>
                    <View style={styles.ratingRow}>
                        <Text style={styles.stars}>
                            {'★'.repeat(Math.round(note.rating || 0)) + '☆'.repeat(5 - Math.round(note.rating || 0))}
                        </Text>

                        {note.price && note.currency && (
                            <Text style={styles.priceText}>
                                {note.currency}{note.price}
                            </Text>
                        )}
                    </View>
                    <Text style={styles.comment}>{note.comment}</Text>
                </View>
            </View>
        </View>
    );
};

export default NoteItem;
