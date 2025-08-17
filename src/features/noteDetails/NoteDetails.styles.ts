import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@/theme/index'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    side: {
        width: 60,
        justifyContent: 'center',
    },

    sideLeft: {
        alignItems: 'flex-start',
    },

    sideRight: {
        alignItems: 'flex-end',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },

    headerIcon: {
        marginLeft: 16,
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },

    imageWrapper: {
        position: 'relative',
        width: width - 32,
        height: width - 32,
        alignSelf: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    noteCard: {
        borderRadius: 28,
        overflow: 'hidden',
        marginBottom: 32,
        backgroundColor: 'transparent',
    },

    noteImage: {
        width: '100%',
        height: 280,
    },

    noteBody: {
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: 'hidden',
    },

    noteContent: {
        position: 'relative',
        zIndex: 2,
    },

    categoryPill: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
    },

    categoryPillText: {
        color: '#333',
        fontSize: 12,
        fontWeight: '500',
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },

    inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    ratingText: {
        fontSize: 14,
        color: '#555',
    },

    price: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },

    comment: {
        color: '#444',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16,
    },

    datesContainer: {
        gap: 4,
    },

    date: {
        fontSize: 13,
        color: '#666',
    },

    editedDate: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },

    popupWrapper: {
        position: 'absolute',
        top: 110,
        right: 16,
        zIndex: 999,
    },

    popupMenu: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        minWidth: 120,
    },

    menuItem: {
        paddingVertical: 10,
    },

    menuText: {
        fontSize: 16,
        color: '#111',
    },

    menuButton: {
        padding: 8,
    },

    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },

    tagPill: {
        borderRadius: 18,
        overflow: 'hidden',

        paddingHorizontal: 20,
        paddingVertical: 6,

        backgroundColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },

    tagText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
})
