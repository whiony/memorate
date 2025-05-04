import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme/theme';

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
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
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
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
});