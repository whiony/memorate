import { StyleSheet } from 'react-native';

export const colors = {
    background: '#FAF8FF',
    containerBackground: '#FFFFFF',
    primary: '#4C4F6D', // #4C4F6D #f56969
    text: '#333',
    buttonText: '#fff',
    placeholder: '#999',
    borderAccent: '#E0DFF9',
    shadow: '#4C4F6D'
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
        backgroundColor: colors.background,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        marginBottom: 8,
        color: colors.text,
    },
    container: {
        backgroundColor: colors.containerBackground,
        borderRadius: 16,
        borderWidth: borders.width,
        borderColor: colors.borderAccent,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    standartInput: {
        flex: 1,
        borderWidth: borders.width,
        borderColor: colors.borderAccent,
        borderRadius: borders.radius,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
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
        borderRadius: 12,
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
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: borders.radius,
        backgroundColor: colors.primary,
    },
});
