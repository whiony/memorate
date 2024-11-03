import { StyleSheet } from 'react-native';

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
        paddingVertical: 10,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#f4511e',
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
        lineHeight: 34,
    },
});