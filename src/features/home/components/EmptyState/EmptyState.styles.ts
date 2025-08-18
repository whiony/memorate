import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },

    emptyCard: {
        minHeight: 280,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,
    },

    cardBlur: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        borderStyle: 'dashed',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    cardGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 32,
    },

    content: {
        alignItems: 'center',
        zIndex: 2,
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderStyle: 'dashed',
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
        letterSpacing: 0.5,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 0.3,
        textAlign: 'center',
        lineHeight: 22,
    },
})