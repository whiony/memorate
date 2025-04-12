import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles/TitleInput.styles';

interface TitleInputProps {
    value: string;
    onChange: (text: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => (
    <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter title"
            placeholderTextColor="#888"
        />
    </View>
);

export default TitleInput;
