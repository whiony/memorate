import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './StarRating.styles';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/theme/index';

interface Props {
    rating: number;
    onChange?: (val: number) => void;
    disabled?: boolean;
    cardList?: boolean;
}

const StarRating: React.FC<Props> = ({
    rating,
    onChange,
    disabled = false,
    cardList = false,
}) => {
    const handlePress = (val: number) => {
        if (!disabled && onChange) onChange(val);
    };

    const filledColor = disabled ? '#000' : '#FFEB3B'
    const emptyColor = disabled ? '#FFF' : '#CCC'

    return (
        <View style={cardList ? styles.cardStarContainer : styles.section}>
            {!cardList && <Text style={globalStyles.label}>Rating</Text>}
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
                                name={'star'}
                                size={cardList ? 18 : 30}
                                color={isFilled ? filledColor : emptyColor}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default StarRating;
