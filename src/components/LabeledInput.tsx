import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { styles } from './LabeledInput.styles';

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
    return (
        <View style={[styles.section, containerStyle]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, inputStyle]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor="#888"
                    {...rest}
                />
                {rightElement}
            </View>
        </View>
    );
};

export default LabeledInput;
