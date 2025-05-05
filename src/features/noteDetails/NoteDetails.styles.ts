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
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginHorizontal: 14,
    },
    headerRight: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 16,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
    },
    pill: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pillText: {
        color: '#fff',
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    image: {
        width: width - 64,
        height: width - 64,
        borderRadius: 12,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    label: {
        width: 80,
        fontWeight: '600',
        color: colors.text,
    },
    value: {
        flex: 1,
        color: colors.text,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    commentContainer: {
        marginTop: 8,
        marginBottom: 12,
    },
    commentText: {
        marginTop: 4,
        lineHeight: 20,
        color: colors.text,
    },
})
