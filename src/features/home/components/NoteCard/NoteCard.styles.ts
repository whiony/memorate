import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: 'rgba(99, 102, 241, 0.3)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
    },

    cardBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },

    cardContent: {
        padding: 16,
        zIndex: 1,
    },

    mainRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    imageWrapper: {
        width: 90,
        height: 90,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 14,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.25)',
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 6,
        color: '#111',
        letterSpacing: 0.3,
    },

    comment: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
        lineHeight: 20,
        letterSpacing: 0.2,
    },

    tagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },

    tagPill: {
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.25)',
    },

    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6366F1',
        letterSpacing: 0.2,
    },

    moreTagsText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#888',
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111',
        letterSpacing: 0.3,
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

    glassButton: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',

        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
});
