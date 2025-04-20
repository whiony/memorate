import React from 'react';
import LabeledInput from '../../components/LabeledInput';
import { styles } from './CommentInput.styles';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

interface CommentInputProps {
    comment: string;
    onChangeComment: (text: string) => void;
    onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
}

const CommentInput: React.FC<CommentInputProps> = ({ onFocus, comment, onChangeComment }) => {
    return (
        <LabeledInput
            label="Comment"
            value={comment}
            onChangeText={onChangeComment}
            placeholder="Write your comment"
            multiline
            inputStyle={styles.multiline}
            onFocus={onFocus}
        />
    );
};

export default CommentInput;