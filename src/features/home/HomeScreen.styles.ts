import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

export const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 65,
        marginBottom: 14,
    },
    categoryContainer: {
        marginBottom: 14,
    },
    listContent: {
        paddingBottom: 90,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{ translateX: -30 }],
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
        fontFamily: fonts.mainFont,
    },
});