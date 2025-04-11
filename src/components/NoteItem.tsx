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
            <Text style={{ ...styles.name, position:"absolute", top: 0, width:"100%", paddingVertical: 12  }}>{note.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width:"100%"}}>
            <View style={{flex:1}}/>
            <Menu
                visible={visibleMenuId === note.id}
                onRequestClose={() => setVisibleMenuId(null)}
                anchor={
                    <TouchableOpacity style={styles.menuButton} onPress={() => setVisibleMenuId(note.id)}>
                        <Text style={styles.menuText}>⋮</Text>
                    </TouchableOpacity>}
                >
                <MenuItem onPress={() => { setVisibleMenuId(null); onEdit(note); }}>Edit</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => { setVisibleMenuId(null); onDelete(note.id); }}>Delete</MenuItem>
            </Menu>
        </View>
        {note.image && <Image source={{ uri: note.image }} style={styles.image} />}
        <Text style={styles.comment}>{note.comment}</Text>
        <Text style={styles.rating}>Rating: {note.rating}</Text>
    </View>
);

export default NoteItem;