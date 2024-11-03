import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginBottom: 0,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginRight: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#f4511e',
    },
    categoryButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});