import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    categoryList: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#f4511e',
    },
    categoryButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    addCategoryButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
        backgroundColor: '#f4511e',
        borderRadius: 20,
    },
    addCategoryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    newCategoryContainer: {
        marginBottom: 20,
    },
    roundButton: {
        backgroundColor: '#f4511e',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
});