import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardWrapper: {
        borderRadius: 16,
        marginBottom: 14,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },

    cardBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },

    cardContent: {
        padding: 12,
        zIndex: 1,
    },

    mainRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    imageWrapper: {
        width: 84,
        height: 84,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
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
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#111',
    },

    comment: {
        fontSize: 13,
        color: '#222',
        marginBottom: 8,
    },

    tagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6,
    },

    tagPill: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },

    tagText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#000',
    },

    moreTagsText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#666',
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    price: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111',
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
