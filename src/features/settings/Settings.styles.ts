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

    placeholder: {
        width: 44,
        height: 44,
    },

    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    settingsCard: {
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

    settingsContent: {
        padding: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginBottom: 20,
        letterSpacing: 0.3,
    },

    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 16,
    },

    settingIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },

    dangerIcon: {
        backgroundColor: 'rgba(229, 57, 53, 0.15)',
        borderColor: 'rgba(229, 57, 53, 0.3)',
    },

    settingInfo: {
        flex: 1,
    },

    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 2,
        letterSpacing: 0.2,
    },

    dangerText: {
        color: '#E53935',
    },

    settingSubtitle: {
        fontSize: 14,
        color: '#666',
        letterSpacing: 0.2,
        lineHeight: 18,
    },

    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginVertical: 8,
    },
})