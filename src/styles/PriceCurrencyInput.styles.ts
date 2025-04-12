import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginBottom: 6,
        marginTop: 14,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    currencyText: {
        fontSize: 16,
        color: '#333',
    },
});
