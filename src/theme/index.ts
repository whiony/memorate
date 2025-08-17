import { StyleSheet } from 'react-native';

export const colors = {
    screenBackground: '#F8FAFC',
    containerBackground: '#FFFFFF',
    primary: '#6366F1',
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
    mainFont: 'Inter',
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
    },
    standartInput: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        fontFamily: fonts.mainFont,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    standartDropdown: {
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    standartDropdownContainer: {
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
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
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
});
