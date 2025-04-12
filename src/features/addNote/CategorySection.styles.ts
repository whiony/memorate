import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

export const styles = StyleSheet.create({
    section: {
        marginHorizontal: 16,
        marginBottom: 6,
        marginTop: 14,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
    },
    categoryButton: {
        marginLeft: 8,
        paddingHorizontal: 12,
    },
    addCategoryButtonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.mainFont,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#fff',
        color: '#000',
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.mainFont,
    },
});
