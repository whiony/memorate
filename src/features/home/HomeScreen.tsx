import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Note, RootStackParamList } from '../../navigation/AppNavigator';
import { collection, getDocs, query, where, deleteDoc, doc, DocumentData, Query } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import { styles } from './HomeScreen.styles';
import NoteItem from './NoteItem';
import CategoryList from './CategoryList';
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    categories: string[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ categories }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const fetchNotes = async () => {
        try {
            let notesQuery: Query<DocumentData> = collection(firestore, 'reviews');
            if (selectedCategory !== 'All') {
                notesQuery = query(notesQuery, where('category', '==', selectedCategory));
            }

            const querySnapshot = await getDocs(notesQuery);
            const notesList = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    created: data.created?.toDate ? data.created.toDate() : new Date(data.created || Date.now()),
                } as Note;
            });

            notesList.sort((a, b) => (b.created?.getTime() || 0) - (a.created?.getTime() || 0));

            setNotes(notesList);
        } catch (error) {
            console.error('Error fetching notes: ', error);
        }
    };

    const handleDelete = async (noteId: string) => {
        try {
            const note = notes.find(n => n.id === noteId);
            console.log("image", note)
            if (note?.image?.startsWith('https://res.cloudinary.com')) {
                await deleteFromCloudinary(note.image);
            }

            await deleteDoc(doc(firestore, 'reviews', noteId));
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
            Alert.alert("Success", "Note deleted successfully.");
        } catch (error) {
            console.error('Error deleting note: ', error);
        }
    };

    const openEditNote = (note: Note) => {
        navigation.navigate('AddNote', { note });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [selectedCategory])
    );

    return (
        <View style={styles.container}>
            <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                numColumns={1}
                contentContainerStyle={styles.flatListContentContainer}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onEdit={openEditNote}
                        onDelete={handleDelete}
                        visibleMenuId={visibleMenuId}
                        setVisibleMenuId={setVisibleMenuId}
                    />
                )}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddNote', {})}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
