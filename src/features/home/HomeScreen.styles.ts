import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

export const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 14,
    },
    categoryContainer: {
        marginBottom: 14,
    },
    listContent: {
        paddingBottom: 100,
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: [{ translateX: -32 }],
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    addButtonText: {
        fontSize: 36,
        color: '#fff',
        marginTop: -2,
        fontFamily: fonts.mainFont,
    },
});