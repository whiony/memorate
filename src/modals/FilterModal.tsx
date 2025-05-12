import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
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

    return (
        <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback>
                    <BlurView intensity={100} tint="light" style={styles.dropdown}>
                        <LinearGradient
                            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                            style={StyleSheet.absoluteFillObject}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />

                        {(['price', 'rating', 'date'] as SortKey[]).map((key) => (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    styles.option,
                                    sortBy === key && styles.optionActive,
                                ]}
                                onPress={() => {
                                    setSort(key)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        sortBy === key && styles.optionTextActive,
                                    ]}
                                >
                                    {labels[key]}
                                </Text>
                                {sortBy === key && (
                                    <MaterialIcons
                                        name={sortOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'}
                                        size={16}
                                        color={'#fff'}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </BlurView>
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
