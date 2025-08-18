import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './SaveButton.styles';
import { globalStyles } from '@/theme/index';
import { useTheme } from '@/contexts/ThemeContext';
import { lightTheme, darkTheme } from '@/theme/colors';

interface SaveButtonProps {
    onPress: () => void;
    title: string;
    disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
    onPress,
    title,
    disabled = false,
}) => {
    const { isDark } = useTheme();
    const colors = isDark ? darkTheme : lightTheme;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.saveButton,
                globalStyles.standartButton,
                { 
                    backgroundColor: colors.accent,
                    borderColor: colors.border,
                    shadowColor: colors.accent
                },
                disabled && styles.disabled
            ]}
        >
            <Text style={[styles.saveButtonText, { color: '#fff' }]}>{title}</Text>
        </TouchableOpacity>
    );
};


export default SaveButton;
