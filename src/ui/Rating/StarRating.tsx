import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import Svg, { Path } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './StarRating.styles'
import { globalStyles } from '@/theme/index'

interface Props {
    rating: number
    onChange?: (val: number) => void
    disabled?: boolean
    cardList?: boolean
}

const Star = ({
    filled,
    size,
    showBorder,
}: {
    filled: boolean
    size: number
    showBorder: boolean
}) => {
    const path =
        'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'

    return (
        <View style={{ width: size, height: size }}>
            <MaskedView
                style={{ width: size, height: size }}
                maskElement={
                    <Svg width={size} height={size} viewBox="0 0 24 24">
                        <Path d={path} fill="#000" />
                    </Svg>
                }
            >
                {filled ? (
                    <LinearGradient
                        colors={['#FF6F61', '#F59B93']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: size, height: size }}
                    />
                ) : (
                    <View
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: showBorder
                                ? '#fff'
                                : 'rgba(255,255,255,0.25)',
                        }}
                    />
                )}
            </MaskedView>

            {!filled && showBorder && (
                <Svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <Path
                        d={path}
                        fill="none"
                        stroke="#999"
                        strokeWidth={1.2}
                    />
                </Svg>
            )}
        </View>
    )
}

const StarRating: React.FC<Props> = ({
    rating,
    onChange,
    disabled = false,
    cardList = false,
}) => {
    const size = cardList ? 20 : 30

    return (
        <View style={cardList ? styles.cardStarContainer : styles.section}>
            {!cardList && <Text style={globalStyles.label}>Rating</Text>}
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map(i => (
                    <TouchableOpacity
                        key={`${i}-${i <= rating}`}
                        onPress={() => onChange?.(i)}
                        disabled={disabled}
                    >
                        <Star
                            filled={i <= rating}
                            size={size}
                            showBorder={!cardList}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default StarRating
