import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Note } from '../navigation/AppNavigator';
import { styles } from '../styles/NoteItem.styles';

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (noteId: string) => void;
    visibleMenuId: string | null;
    setVisibleMenuId: (id: string | null) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete, visibleMenuId, setVisibleMenuId }) => (
    <View style={styles.note}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setVisibleMenuId(note.id)}>
            <Text style={styles.menuText}>⋮</Text>
        </TouchableOpacity>
        <Menu
            visible={visibleMenuId === note.id}
            onRequestClose={() => setVisibleMenuId(null)}
            anchor={<View />}
        >
            <MenuItem onPress={() => { setVisibleMenuId(null); onEdit(note); }}>Edit</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { setVisibleMenuId(null); onDelete(note.id); }}>Delete</MenuItem>
        </Menu>
        <Text style={styles.name}>{note.name}</Text>
        {note.image && <Image source={{ uri: note.image }} style={styles.image} />}
        <Text style={styles.comment}>{note.comment}</Text>
        <Text style={styles.rating}>Rating: {note.rating}</Text>
    </View>
);

export default NoteItem;