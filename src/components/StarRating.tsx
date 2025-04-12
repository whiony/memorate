import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface StarRatingProps {
    rating: number;
    onChange: (val: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
    return (
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
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 30,
        marginHorizontal: 4,
        color: '#aaa',
    },
    starFilled: {
        color: '#FFD700', // Золотой цвет
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default StarRating;
