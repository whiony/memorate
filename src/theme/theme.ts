import { StyleSheet } from 'react-native';

export const colors = {
    screenBackground: '#F2F2F7',
    containerBackground: '#FFFFFF',
    primary: '#4C4F6D',
    text: '#333',
    buttonText: '#fff',
    placeholder: '#999',
    borderAccent: '#54545657',
    shadow: '#545456'
};

export const borders = {
    radius: 12,
    width: 1
}

export const fonts = {
    mainFont: 'Poppins-Regular',
}

export const globalStyles = StyleSheet.create({
    screenBackground: {
        flex: 1,
        backgroundColor: colors.screenBackground,
    },
    label: {
        fontSize: 16,
        fontFamily: fonts.mainFont,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.text,
    },
    container: {
        backgroundColor: colors.containerBackground,
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 16,
    },
    standartInput: {
        flex: 1,
        borderWidth: borders.width,
        borderColor: colors.borderAccent,
        borderRadius: borders.radius,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
        fontFamily: fonts.mainFont,
        backgroundColor: '#fff',
        color: '#000',
    },
    standartDropdown: {
        borderRadius: borders.radius,
        borderWidth: borders.width,
        borderColor: colors.borderAccent,
        backgroundColor: '#fff',
    },
    standartDropdownContainer: {
        borderColor: colors.borderAccent,
        borderRadius: borders.radius,
    },
    standartDropdownText: {
        fontSize: 15,
        fontFamily: fonts.mainFont,
        color: colors.text,
    },
    standartBorder: {
        borderRadius: borders.radius,
    },
    standartButton: {
        paddingVertical: 13,
        alignItems: 'center',
        borderRadius: borders.radius,
        backgroundColor: colors.primary,
    },
});
