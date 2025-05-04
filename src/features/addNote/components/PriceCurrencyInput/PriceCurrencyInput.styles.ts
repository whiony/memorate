import { StyleSheet } from 'react-native';
import { borders, colors } from '@/theme/theme';

export const styles = StyleSheet.create({
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.borderAccent,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#fff',
        fontSize: 15,
        marginRight: 8,
        color: '#000',
    },
    currencyToggle: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: borders.radius,
        borderWidth: 1,
        borderColor: colors.borderAccent,
    },
    currencyText: {
        fontSize: 16,
        color: colors.text,
    },
});
