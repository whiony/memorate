import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    keyboardView: {
        flex: 1,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    header: {
        alignItems: 'center',
        marginBottom: 40,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111',
        marginBottom: 8,
        letterSpacing: 0.5,
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 0.3,
    },

    form: {
        borderRadius: 32,
        overflow: 'hidden',
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,
    },

    formGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    inputContainer: {
        position: 'relative',
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
        overflow: 'hidden',
    },

    inputIcon: {
        position: 'absolute',
        left: 16,
        top: 18,
        zIndex: 1,
    },

    input: {
        paddingVertical: 18,
        paddingLeft: 48,
        paddingRight: 16,
        fontSize: 16,
        color: '#111',
        backgroundColor: 'transparent',
        borderRadius: 16,
    },

    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 18,
        zIndex: 1,
    },

    button: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 8,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },

    buttonDisabled: {
        opacity: 0.7,
    },

    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    switchButton: {
        alignItems: 'center',
        marginTop: 24,
    },

    switchText: {
        fontSize: 14,
        color: '#666',
        letterSpacing: 0.2,
    },

    switchTextBold: {
        fontWeight: '700',
        color: '#6366F1',
    },
})