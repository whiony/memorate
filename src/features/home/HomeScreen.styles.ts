import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme/index';

export const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 70,
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 14,
    },
    listContent: {
        paddingBottom: 100,
    },

    addButton: {
        position: 'absolute',
        bottom: 50,
        left: '53%',
        transform: [{ translateX: -32 }],
        width: 70,
        height: 70,
        borderRadius: 36,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },

    filterButton: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },

    settingsButton: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },

    glassButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 9999,
    },

    glassBorderOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 9999,
        borderWidth: 1.2,
        borderColor: 'rgba(255,255,255,0.4)',

        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
});
