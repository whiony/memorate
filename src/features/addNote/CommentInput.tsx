import React from 'react';
import LabeledInput from '../../components/LabeledInput';
import { styles } from './CommentInput.styles';

interface CommentInputProps {
    comment: string;
    onChangeComment: (text: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ comment, onChangeComment }) => {
    return (
        <LabeledInput
            label="Comment"
            value={comment}
            onChangeText={onChangeComment}
            placeholder="Write your comment"
            multiline
            inputStyle={styles.multiline}
        />
    );
};

export default CommentInput;