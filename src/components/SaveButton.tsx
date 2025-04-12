import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './SaveButton.styles';
import { globalStyles } from '../theme/theme';

interface SaveButtonProps {
    onPress: () => void;
    title: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={[styles.saveButton, globalStyles.standartButton]}>
        <Text style={styles.saveButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default SaveButton;
