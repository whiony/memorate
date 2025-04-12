import { StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/theme';

export const styles = StyleSheet.create({
    saveButton: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    saveButtonText: {
        color: colors.buttonText,
        fontSize: 17,
        fontFamily: fonts.mainFont,
        fontWeight: '600',
    },
});
