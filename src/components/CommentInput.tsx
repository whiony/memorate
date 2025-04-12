import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles/CommentInput.styles';

interface CommentInputProps {
    comment: string;
    onChangeComment: (text: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ comment, onChangeComment }) => (
    <View style={styles.section}>
        <Text style={styles.label}>Comment</Text>
        <TextInput
            style={[styles.input, styles.multiline]}
            value={comment}
            onChangeText={onChangeComment}
            placeholder="Write your comment"
            placeholderTextColor="#888"
            multiline
        />
    </View>
);

export default CommentInput;
