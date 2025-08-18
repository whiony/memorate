import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },

    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
    },

    profileCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },

    statsCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },

    cardGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        gap: 16,
    },

    avatarContainer: {
        alignItems: 'center',
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },

    userInfo: {
        flex: 1,
    },

    email: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: 4,
        letterSpacing: 0.3,
    },

    joinDate: {
        fontSize: 14,
        color: '#666',
        letterSpacing: 0.2,
    },

    statsContent: {
        padding: 24,
    },

    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    statIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },

    statInfo: {
        flex: 1,
    },

    statNumber: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111',
        letterSpacing: 0.5,
        marginBottom: 2,
    },

    statLabel: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 0.3,
        fontWeight: '500',
    },
})