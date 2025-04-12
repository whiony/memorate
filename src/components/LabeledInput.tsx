// src/components/LabeledInput.tsx
import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
        <View style={[defaultStyles.section, containerStyle]}>
            <Text style={[defaultStyles.label, labelStyle]}>{label}</Text>
            <View style={defaultStyles.row}>
                <TextInput
                    style={[defaultStyles.input, inputStyle]}
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

const defaultStyles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginVertical: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#fff',
        color: '#000',
    },
});
