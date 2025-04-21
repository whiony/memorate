import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#fff",
        margin: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#dbdada',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
