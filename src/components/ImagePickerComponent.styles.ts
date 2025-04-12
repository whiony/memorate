import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    imageContainer: {
        height: 220,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        color: '#999',
        fontSize: 14,
    },
});
