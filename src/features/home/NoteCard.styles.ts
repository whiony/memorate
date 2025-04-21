import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        marginBottom: 14,
        overflow: 'visible',
    },
    mainRow: { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 16 },

    imageWrapper: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginRight: 12,
        overflow: 'hidden',
    },
    image: { width: '100%', height: '100%' },

    mainContent: {
        flex: 1,
        justifyContent: 'flex-start'
    },

    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    comment: { fontSize: 14, color: '#333', lineHeight: 20 },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginHorizontal: 16 },

    footer: {
        position: 'relative',
        height: 32,
        marginBottom: 16,
    },
    date: { position: 'absolute', left: 16, fontSize: 14, color: '#000', bottom: 0 },
    centerStars: { position: 'absolute', left: 0, right: 0, alignItems: 'center', bottom: 0 },
    price: { position: 'absolute', right: 16, fontSize: 14, bottom: 0 },
    pricePlaceholder: { position: 'absolute', right: 16, width: 40, bottom: 0 },

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
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});    