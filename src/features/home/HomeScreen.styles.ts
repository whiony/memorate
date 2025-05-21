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
        marginHorizontal: 60,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 72,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        overflow: 'visible',
    },

    tabBarBackgroundWrapper: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        borderRadius: 999,
    },

    tabBarBackground: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
    },

    iconButton: {
        position: 'absolute',
        top: '46%',
        left: 32,
        transform: [{ translateY: -12 }],
    },

    rightIcon: {
        left: undefined,
        right: 32,
    },

    floatingAddButton: {
        position: 'absolute',
        top: -10,
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: 'rgba(255,255,255,0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },

    floatingButtonGlass: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});
