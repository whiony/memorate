import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
} from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import { colors, fonts } from '../theme/theme'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useSort } from '../contexts/SortContext'

type Props = StackScreenProps<RootStackParamList, 'FilterModal'>
type SortKey = 'price' | 'rating' | 'date'

const FilterModal: React.FC<Props> = ({ route, navigation }) => {
    const { sortBy, setSortBy } = useSort()
    const { current } = route.params
    const [selected, setSelected] = useState<SortKey>(current)

    const labels: Record<SortKey, string> = {
        price: 'Price',
        rating: 'Rating',
        date: 'Date',
    }

    return (
        <Pressable style={styles.backdrop} onPress={() => navigation.goBack()}>
            <TouchableWithoutFeedback>
                <View style={styles.dropdown}>
                    {(['price', 'rating', 'date'] as SortKey[]).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[
                                styles.option,
                                selected === key && styles.optionActive,
                            ]}
                            onPress={() => {
                                setSortBy(key)
                                navigation.goBack()
                            }}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selected === key && styles.optionTextActive,
                                ]}
                            >
                                {labels[key]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableWithoutFeedback>
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
        backgroundColor: colors.screenBackground,
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    option: {
        paddingVertical: 8,
        borderRadius: 6,
        marginBottom: 4,
        alignItems: 'center',
    },
    optionActive: {
        backgroundColor: colors.primary,
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
})
