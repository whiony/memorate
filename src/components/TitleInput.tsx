import React from 'react';
import LabeledInput from './LabeledInput';

interface TitleInputProps {
    value: string;
    onChange: (text: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
    return (
        <LabeledInput
            label="Title"
            value={value}
            onChangeText={onChange}
            placeholder="Enter title"
        />
    );
};

export default TitleInput;
