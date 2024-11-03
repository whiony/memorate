import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    note: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        width: screenWidth / 2 - 30,
        position: 'relative',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 10,
    },
    rating: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    menuText: {
        fontSize: 18,
        color: '#666',
    },
});