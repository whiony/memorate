import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    flatListContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    addButton: {
        display: 'flex',
        flexDirection: "row",
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
        fontFamily: fonts.mainFont,
        textAlign: 'center',
        marginTop: -4,
    },
});