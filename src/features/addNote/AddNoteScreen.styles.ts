import { StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

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
        paddingHorizontal: 14,
        paddingBottom: 16,
    },
    headerButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
