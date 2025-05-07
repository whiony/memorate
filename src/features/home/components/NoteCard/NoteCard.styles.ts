import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 14,
        overflow: 'visible',
        padding: 4,
    },

    cardWrapper: {
        borderRadius: 20,
        marginBottom: 14,
        overflow: 'hidden',
        position: 'relative',
    },

    cardBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },

    cardContent: {
        position: 'relative',
        zIndex: 1,
        padding: 4,
    },

    mainRow: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },

    imageWrapper: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginRight: 12,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    comment: {
        fontSize: 14,
        color: '#000',
        lineHeight: 15,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginHorizontal: 16,
    },

    footer: {
        position: 'relative',
        height: 32,
        marginBottom: 16,
    },

    date: {
        position: 'absolute',
        left: 16,
        fontSize: 14,
        color: '#000',
        top: '50%',
    },

    centerStars: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },

    price: {
        position: 'absolute',
        right: 16,
        fontSize: 14,
        top: '50%',
    },

    pricePlaceholder: {
        position: 'absolute',
        right: 16,
        width: 40,
        top: '50%',
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        paddingHorizontal: 8,
        overflow: 'hidden',
    },

    actionButton: {
        width: 67,
        height: 65,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    editAction: {
        backgroundColor: '#FFE066',
    },

    editIcon: {
        paddingLeft: 3,
    },

    deleteAction: {
        backgroundColor: '#EF5350',
    },

    starsGlass: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
});
