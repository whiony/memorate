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
        height: (width - 32) * 0.75,
        alignSelf: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: 'rgba(255,255,255,0.2)',
    },

    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    noteCard: {
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 32,
        backgroundColor: 'transparent',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,
    },

    noteImage: {
        width: '100%',
        height: 280,
    },

    noteBody: {
        paddingTop: 24,
        paddingBottom: 32,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: 'rgba(255,255,255,0.2)',
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
        fontSize: 26,
        fontWeight: '800',
        color: '#111',
        marginBottom: 16,
        letterSpacing: 0.5,
        lineHeight: 32,
    },

    inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingVertical: 8,
    },

    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: 'rgba(99, 102, 241, 0.25)',
        letterSpacing: 0.3,
    },

    comment: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        letterSpacing: 0.3,
    },

    datesContainer: {
        gap: 6,
        paddingTop: 8,
    },

    date: {
        fontSize: 14,
        color: '#666',
        letterSpacing: 0.2,
    },

    editedDate: {
        fontSize: 13,
        color: '#888',
        fontStyle: 'italic',
        letterSpacing: 0.2,
    },

    popupWrapper: {
        position: 'absolute',
        top: 110,
        right: 16,
        zIndex: 999,
    },

    popupMenu: {
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 0,
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 12,
        minWidth: 140,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },

    menuItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },

    menuText: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600',
        letterSpacing: 0.3,
    },

    menuButton: {
        padding: 8,
    },

    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 16,
    },

    tagPill: {
        borderRadius: 20,
        overflow: 'hidden',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(99, 102, 241, 0.25)',
    },

    tagText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6366F1',
        letterSpacing: 0.3,
    },
})
