import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: width - 32,
        height: (width - 32) * 0.6,
        borderRadius: 12,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 12,
    },
    label: {
        fontWeight: '600',
        width: 90,
    },
    value: {
        flex: 1,
        flexWrap: 'wrap',
    },
    ratingContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    commentContainer: {
        width: '100%',
        marginTop: 8,
    },
    comment: {
        marginTop: 4,
        lineHeight: 20,
    },
})