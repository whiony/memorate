import { StyleSheet } from 'react-native';
import { colors, fonts } from "@/theme";

export const styles = StyleSheet.create({
    section: {},
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
    },
    categoryButton: {
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: '#fff',
        fontSize: 15,
        color: '#000',
        marginBottom: 0,
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.mainFont,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 12,
    },
    tagPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,

        backgroundColor: 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    },
    tagText: {
        color: '#000',
        fontSize: 14,
        fontFamily: fonts.mainFont,
    },
    tagOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,

        backgroundColor: 'rgba(0,0,0,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    },
});
