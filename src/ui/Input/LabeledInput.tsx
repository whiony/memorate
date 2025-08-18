import React from 'react';
import { View, Text, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { styles } from './LabeledInput.styles';
import { globalStyles } from '@/theme/index';
import { useTheme } from '@/contexts/ThemeContext';
import { lightTheme, darkTheme } from '@/theme/colors';

export interface LabeledInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    rightElement?: React.ReactNode;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
    value,
    onChangeText,
    containerStyle,
    labelStyle,
    inputStyle,
    rightElement,
    ...rest
}) => {
    const { isDark } = useTheme();
    const colors = isDark ? darkTheme : lightTheme;

    return (
        <View style={[styles.section, containerStyle]}>
            <Text style={[globalStyles.label, { color: colors.text }, labelStyle]}>{label}</Text>
            <View style={styles.row}>
                <TextInput
                    style={[
                        globalStyles.standartInput, 
                        { 
                            backgroundColor: colors.cardBackground, 
                            borderColor: colors.border,
                            color: colors.text 
                        }, 
                        inputStyle
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor={colors.textMuted}
                    {...rest}
                />
                {rightElement}
            </View>
        </View>
    );
};

export default LabeledInput;
