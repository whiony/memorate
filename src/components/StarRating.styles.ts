import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginBottom: 6,
        marginTop: 14,
    },
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        fontSize: 30,
        marginHorizontal: 4,
        color: '#aaa',
    },
    starFilled: {
        color: '#FFD700',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    cardStarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardStar: {
        fontSize: 18,
        marginHorizontal: 2,
    },
});