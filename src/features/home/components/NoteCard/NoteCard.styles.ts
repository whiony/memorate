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
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        color: '#666',
        letterSpacing: 0.3,

        position: 'absolute',
        top: '45%',
        left: 16,
    },

    centerStars: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    price: {
        position: 'absolute',
        top: '43%',
        right: 16,

        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        color: '#444',
        letterSpacing: 0.3,
    },

    pricePlaceholder: {
        position: 'absolute',
        right: 16,
        width: 40,
        top: '45%',
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
        width: 66,
        height: 66,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    editAction: {
        backgroundColor: '#fac663',
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

    glassButton: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },

    absoluteFill: {
        ...StyleSheet.absoluteFillObject,
    },

    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        zIndex: -1,
    },

    glassBorder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'transparent',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        zIndex: 1,
    },

});
