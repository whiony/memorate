import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 70,
        marginBottom: 20,
    },

    categoryContainer: {
        marginBottom: 16,
    },

    listContent: {
        paddingBottom: 100,
    },

    tabBarContainer: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
        height: 70,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },

    tabBarBackgroundWrapper: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        borderRadius: 999,
    },

    tabBarBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 999,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
    },

    iconButton: {
        position: 'absolute',
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        left: 28,
        borderRadius: 22,
    },

    rightIcon: {
        left: undefined,
        right: 28,
    },

    floatingAddButton: {
        position: 'absolute',
        top: -8,
        alignSelf: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },

    floatingButtonGlass: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 32,
        backgroundColor: 'rgba(99, 102, 241, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
