import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './StarRating.styles';
import { Ionicons } from '@expo/vector-icons';

interface StarRatingProps {
    rating: number;
    onChange?: (val: number) => void;
    disabled?: boolean;
    cardList?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange, disabled = false, cardList = false }) => {
    const handlePress = (val: number) => {
        if (!disabled && onChange) {
            onChange(val);
        }
    };

    return (
        <View style={cardList ? styles.cardStarContainer : styles.section}>
            {!cardList && <Text style={styles.label}>Rating</Text>}
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((i) => {
                    const isFilled = i <= rating;
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => handlePress(i)}
                            disabled={disabled}
                        >
                            <Ionicons
                                name={isFilled ? 'star' : 'star-outline'}
                                size={cardList ? 18 : 30}
                                color={isFilled ? '#FFD700' : '#aaa'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default StarRating;
