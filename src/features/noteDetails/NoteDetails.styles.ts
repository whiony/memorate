import { StyleSheet, Dimensions } from 'react-native'
import { colors } from '@/theme/index'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBackground,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#dbdada',
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

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
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

    textOnImage: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },

    titleOnImage: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    noImageHeader: {
        padding: 16,
    },

    titleNoImage: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginTop: 8,
    },

    blurOverlay: {
        borderRadius: 16,
        padding: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },

    categoryPill: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,1)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },

    categoryPillText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
    },

    body: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    inlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },

    ratingText: {
        color: colors.text,
        fontSize: 14,
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },

    comment: {
        color: colors.text,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20,
    },

    date: {
        fontSize: 13,
        color: '#66a7b0',
        marginBottom: 20,
    },
})
