import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AddNoteHeader.styles';

interface AddNoteHeaderProps {
    title: string;
}

const AddNoteHeader: React.FC<AddNoteHeaderProps> = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);

export default AddNoteHeader;
