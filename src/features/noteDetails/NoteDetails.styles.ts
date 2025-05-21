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
        padding: 16,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },

    side: {
        width: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        gap: 8,
        marginBottom: 12,
    },

    ratingText: {
        fontSize: 14,
        color: '#555',
    },

    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },

    comment: {
        color: '#444',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 16,
    },

    date: {
        fontSize: 13,
        color: '#000',
        opacity: 0.5,
    },
})
