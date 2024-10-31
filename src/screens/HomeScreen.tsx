import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Note {
    id: string;
    comment: string;
    rating: number;
    image?: string;
}

const screenWidth = Dimensions.get('window').width; 

const HomeScreen = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const fetchNotes = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'reviews'));
            const notesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotes(notesList as Note[]);
        } catch (error) {
            console.error('Error fetching notes: ', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes(); 
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <View style={styles.note}>
                        <Text style={styles.comment}>{item.comment}</Text>
                        <Text style={styles.rating}>Rating: {item.rating}</Text>
                        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddNote')}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        justifyContent: 'space-between', 
    },
    note: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        width: (screenWidth / 2) - 20, 
    },
    comment: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
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

export default HomeScreen;