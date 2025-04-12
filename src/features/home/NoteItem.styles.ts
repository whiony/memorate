import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    row: {
        flexDirection: 'row',
    },

    imageContainer: {
        width: 100,
        marginRight: 12,
        alignItems: 'center',
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginBottom: 4,
    },

    date: {
        fontSize: 12,
        color: '#777',
    },

    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },

    stars: {
        flexDirection: 'row',
        marginBottom: 4,
    },

    comment: {
        fontSize: 14,
        color: '#555',
    },

    menuContainer: {
        position: 'absolute',
        top: -4,
        right: 0,
        zIndex: 1,
    },

    menuButton: {
        padding: 8,
    },

    menuText: {
        fontSize: 18,
    },

    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    priceText: {
        fontWeight: 'bold',
        fontSize: 14,
    },

});
