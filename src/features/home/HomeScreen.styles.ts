import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

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
        bottom: 40,
        left: '53%',
        transform: [{ translateX: -32 }],
        width: 67,
        height: 65,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    addButtonText: {
        fontSize: 36,
        color: '#fff',
        marginTop: -5,
        fontFamily: fonts.mainFont,
    },
});