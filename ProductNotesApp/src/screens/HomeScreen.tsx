import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

interface Note {
    id: string;
    comment: string;
    rating: number;
    image?: string;
}

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

const HomeScreen = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'reviews'));
            const notesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotes(notesList as Note[]);
        };

        fetchNotes();
    }, []);

    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default HomeScreen;
