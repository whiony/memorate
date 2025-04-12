import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/SaveButton.styles';

interface SaveButtonProps {
    onPress: () => void;
    title: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default SaveButton;
