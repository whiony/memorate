import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/StarRating.styles';

interface StarRatingProps {
    rating: number;
    onChange: (val: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((i) => {
                    const isFilled = i <= rating;
                    return (
                        <TouchableOpacity key={i} onPress={() => onChange(i)}>
                            <Text style={[styles.star, isFilled && styles.starFilled]}>
                                {isFilled ? '★' : '☆'}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default StarRating;
