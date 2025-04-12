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
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
    },
    dropdown: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        borderColor: '#D0D0D0',
        borderRadius: 10,
    },
    dropdownText: {
        fontSize: 15,
        color: '#000',
    },
    addCategoryButton: {
        backgroundColor: '#4C4F6D',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    addCategoryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#fff',
        color: '#000',
    },
    roundButton: {
        marginLeft: 8,
        backgroundColor: '#4C4F6D',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
