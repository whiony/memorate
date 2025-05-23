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
            <TouchableWithoutFeedback>
                <View style={styles.dropdown}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 6,
        marginBottom: 4,
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
