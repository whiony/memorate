import React, { useEffect, useRef } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import { colors, fonts } from '@/theme/index'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { useSort } from '@/contexts/SortContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import {
    useFadeInUp,
    useAnimatedValue,
    animateTo,
    animateParallel,
    interpolateColor,
} from '@/hooks/useAnimations'

type Props = StackScreenProps<RootStackParamList, 'FilterModal'>
type SortKey = 'price' | 'rating' | 'date'

const FilterModal: React.FC<Props> = ({ navigation }) => {
    const { sortBy, sortOrder, setSort } = useSort()

    const labels: Record<SortKey, string> = {
        price: 'Price',
        rating: 'Rating',
        date: 'Date',
    }

    const dropdownAnim = useFadeInUp()
    const arrowRotationAnim = useAnimatedValue(sortOrder === 'asc' ? 0 : 1)

    const activeAnim = useRef({
        price: useAnimatedValue(sortBy === 'price' ? 1 : 0),
        rating: useAnimatedValue(sortBy === 'rating' ? 1 : 0),
        date: useAnimatedValue(sortBy === 'date' ? 1 : 0),
    }).current

    useEffect(() => {
        animateTo(arrowRotationAnim, sortOrder === 'asc' ? 0 : 1).start()
    }, [sortOrder])

    return (
        <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.dropdown, dropdownAnim]}>
                        <BlurView intensity={120} tint="light" style={StyleSheet.absoluteFill}>
                            <LinearGradient
                                colors={[
                                    'rgba(255,255,255,0.4)',
                                    'rgba(255,255,255,0.25)',
                                    'rgba(255,255,255,0.35)',
                                ]}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                        </BlurView>

                        {(['price', 'rating', 'date'] as SortKey[]).map((key) => {
                            const isActive = sortBy === key
                            const colorAnim = interpolateColor(activeAnim[key], '#000', '#fff')
                            const iconOpacity = activeAnim[key].interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
                            const iconTranslateY = activeAnim[key].interpolate({ inputRange: [0, 1], outputRange: [4, 0] })

                            return (
                                <TouchableOpacity
                                    key={key}
                                    onPress={() => {
                                        if (isActive) {
                                            setSort(key)
                                        } else {
                                            animateParallel([
                                                animateTo(activeAnim[sortBy], 0),
                                                animateTo(activeAnim[key], 1),
                                            ], () => setSort(key))
                                        }
                                    }}
                                >
                                    <Animated.View
                                        style={[
                                            styles.option,
                                            {
                                                backgroundColor: activeAnim[key].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['transparent', 'rgba(255,255,255,0.25)'],
                                                }),
                                                transform: [
                                                    {
                                                        scale: activeAnim[key].interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [1, 1.05],
                                                        }),
                                                    },
                                                ],
                                                borderColor: activeAnim[key].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['transparent', 'rgba(255,255,255,0.4)'],
                                                }),
                                                borderWidth: 1,
                                            },
                                        ]}
                                    >
                                        <Animated.Text
                                            style={[
                                                styles.optionText,
                                                {
                                                    color: colorAnim,
                                                    textShadowColor: 'rgba(255, 255, 255, 0.8)',
                                                    textShadowOffset: { width: 0, height: 1 },
                                                    textShadowRadius: 2,
                                                    fontWeight: isActive ? '600' : '500',
                                                },
                                            ]}
                                        >
                                            {labels[key]}
                                        </Animated.Text>

                                        <Animated.View
                                            style={{
                                                marginLeft: 8,
                                                opacity: iconOpacity,
                                                transform: [
                                                    { translateY: iconTranslateY },
                                                    {
                                                        rotate: arrowRotationAnim.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: ['0deg', '180deg'],
                                                        }),
                                                    },
                                                ],
                                            }}
                                        >
                                            <MaterialIcons
                                                name="arrow-upward"
                                                size={16}
                                                color="#fff"
                                            />
                                        </Animated.View>
                                    </Animated.View>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </Pressable>
    )
}

export default FilterModal

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    dropdown: {
        position: 'absolute',
        bottom: 110,
        left: 32,
        width: 150,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.35)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 15,
        padding: 12,
    },

    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginBottom: 6,
        minHeight: 44,
    },

    optionText: {
        fontSize: 15,
        fontFamily: fonts.mainFont,
        color: colors.text,
    },
})
