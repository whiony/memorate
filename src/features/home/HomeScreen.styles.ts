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
        width: 72,
        height: 70,
        borderRadius: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    addButtonText: {
        fontSize: 40,
        color: '#fff',
        marginTop: -5,
        fontFamily: fonts.mainFont,
    },
    filterButton: {
        position: 'absolute',
        bottom: 50,
        left: 16,
        width: 48,
        height: 48,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    glassButton: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    coloredGlass: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 111, 97, 0.4)',
        borderWidth: 1,
    },

    absoluteFill: {
        ...StyleSheet.absoluteFillObject,
    },

    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        zIndex: -1,
    },

    glassBorder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'transparent',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        zIndex: 1,
    },
});