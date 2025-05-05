import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './SaveButton.styles';
import { globalStyles } from '@/theme/index';

interface SaveButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
    onPress,
    title,
    disabled = false,
}) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
            styles.saveButton,
            globalStyles.standartButton,
            disabled && styles.disabled
        ]}
    >
        <Text style={styles.saveButtonText}>{title}</Text>
    </TouchableOpacity>
);


export default SaveButton;
