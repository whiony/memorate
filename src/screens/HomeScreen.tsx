import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

const HomeScreen = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // Fetch notes from Firestore
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'reviews'));
                const notesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNotes(notesList as Note[]);
            } catch (error) {
                console.error('Error fetching notes: ', error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <View style={styles.container}>
            {/* List of notes */}
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.note}>
                        <Text>{item.comment}</Text>
                        <Text>Rating: {item.rating}</Text>
                        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
                    </View>
                )}
            />

            {/* Add Note Button */}
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
        padding: 20,
    },
    note: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
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