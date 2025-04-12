import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    screenContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#4C4F6D',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    imageContainer: {
        height: 220,
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        // marginBottom: 6,
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        color: '#999',
        fontSize: 14,
    },
    section: {
        marginHorizontal: 16,
        marginBottom: 6,
        marginTop: 14,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
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
    multiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#fff',
        fontSize: 15,
        marginRight: 8,
        color: '#000',
    },
    currencyToggle: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    currencyText: {
        fontSize: 16,
        color: '#333',
    },
    starWrapper: {
        marginTop: 4,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
    },
    dropdown: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        borderColor: '#D0D0D0',
        borderRadius: 10,
    },
    dropdownText: {
        fontSize: 15,
        color: '#000',
    },
    addCategoryButton: {
        backgroundColor: '#4C4F6D',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    addCategoryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    roundButton: {
        marginLeft: 8,
        backgroundColor: '#4C4F6D',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    saveButton: {
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: '#4C4F6D',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});
