import React, { useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    Easing,
} from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import { colors, fonts } from '@/theme/index'
import { RootStackParamList } from '@/navigation/AppNavigator'
import { useSort } from '@/contexts/SortContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

type Props = StackScreenProps<RootStackParamList, 'FilterModal'>
type SortKey = 'price' | 'rating' | 'date'

const FilterModal: React.FC<Props> = ({ navigation }) => {
    const { sortBy, sortOrder, setSort } = useSort()

    const labels: Record<SortKey, string> = {
        price: 'Price',
        rating: 'Rating',
        date: 'Date',
    }

    const dropdownAnim = useRef(new Animated.Value(0)).current
    const arrowRotationAnim = useRef(new Animated.Value(sortOrder === 'asc' ? 0 : 1)).current

    const activeAnim = useRef({
        price: new Animated.Value(sortBy === 'price' ? 1 : 0),
        rating: new Animated.Value(sortBy === 'rating' ? 1 : 0),
        date: new Animated.Value(sortBy === 'date' ? 1 : 0),
    }).current

    useEffect(() => {
        Animated.timing(dropdownAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start()
    }, [])

    useEffect(() => {
        Animated.timing(arrowRotationAnim, {
            toValue: sortOrder === 'asc' ? 0 : 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start()
    }, [sortOrder])

    return (
        <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            styles.dropdown,
                            {
                                opacity: dropdownAnim,
                                transform: [
                                    {
                                        translateY: dropdownAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <BlurView intensity={100} tint="light" style={StyleSheet.absoluteFill}>
                            <LinearGradient
                                colors={[
                                    'rgba(255,255,255,1)',
                                    'rgba(255,255,255,.6)',
                                    'rgba(255,255,255,0)',
                                    'rgba(255,255,255,0.2)',
                                    'rgba(255,255,255,0)',
                                ]}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                        </BlurView>

                        {(['price', 'rating', 'date'] as SortKey[]).map((key) => {
                            const isActive = sortBy === key

                            const colorAnim = activeAnim[key].interpolate({
                                inputRange: [0, 1],
                                outputRange: ['#000', '#fff'],
                            })

                            const iconOpacity = activeAnim[key].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })

                            const iconTranslateY = activeAnim[key].interpolate({
                                inputRange: [0, 1],
                                outputRange: [4, 0],
                            })

                            return (
                                <TouchableOpacity
                                    key={key}
                                    onPress={() => {
                                        if (key === sortBy) {
                                            setSort(key)
                                        } else {
                                            Animated.parallel([
                                                Animated.timing(activeAnim[sortBy], {
                                                    toValue: 0,
                                                    duration: 200,
                                                    useNativeDriver: false,
                                                }),
                                                Animated.timing(activeAnim[key], {
                                                    toValue: 1,
                                                    duration: 200,
                                                    useNativeDriver: false,
                                                }),
                                            ]).start(() => {
                                                setSort(key)
                                            })
                                        }
                                    }}
                                >
                                    <Animated.View
                                        style={[
                                            styles.option,
                                            {
                                                backgroundColor: activeAnim[key].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['transparent', 'rgba(255,255,255,0.15)'],
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
                                                    outputRange: ['transparent', 'rgba(255,255,255,0.3)'],
                                                }),
                                                borderWidth: 1,
                                            },
                                        ]}
                                    >
                                        <Animated.Text style={[styles.optionText, { color: colorAnim }]}>
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
        left: 16,
        width: 140,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        padding: 8,
    },

    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 6,
        marginBottom: 4,
    },

    optionActive: {
        ...Platform.select({
            web: {
                backdropFilter: 'blur(8px)',
            },
        }),
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },

    optionText: {
        fontSize: 14,
        fontFamily: fonts.mainFont,
        color: colors.text,
    },

    optionTextActive: {
        color: colors.buttonText,
    },

    applyButton: {
        marginTop: 6,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: colors.primary,
        alignItems: 'center',
    },

    applyText: {
        fontSize: 14,
        color: colors.buttonText,
        fontFamily: fonts.mainFont,
    },

    modalBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
})
