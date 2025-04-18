import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Note, RootStackParamList } from '../../navigation/AppNavigator';
import { collection, getDocs, query, where, deleteDoc, doc, Query, DocumentData } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary';
import { useCategories } from '../../hooks/useCategories';
import NoteItem from './NoteItem';
import CategoryFilter from './CategoryFilter';
import { styles } from './HomeScreen.styles';
import { globalStyles } from '../../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [notes, setNotes] = useState<Note[]>([]);
    const [category, setCategory] = useState('All');
    const { categories } = useCategories();

    const fetchNotes = async () => {
        let notesQuery: Query<DocumentData> = collection(firestore, 'reviews');
        if (category !== 'All') {
            notesQuery = query(notesQuery, where('category', '==', category));
        }
        const snap = await getDocs(notesQuery);
        const loaded = snap.docs.map(d => ({
            id: d.id,
            ...d.data(),
            created: d.data().created?.toDate ? d.data().created.toDate() : new Date(),
        })) as Note[];
        loaded.sort((a, b) => (b.created?.getTime() ?? 0) - (a.created?.getTime() ?? 0));
        setNotes(loaded);
    };

    useEffect(() => {
        fetchNotes();
    }, [category]);

    const handleDelete = async (noteId: string) => {
        const note = notes.find(n => n.id === noteId);
        if (note?.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image);
        }
        await deleteDoc(doc(firestore, 'reviews', noteId));
        setNotes(prev => prev.filter(n => n.id !== noteId));
    };

    const openEdit = (note: Note) => {
        navigation.navigate('AddNote', { note });
    };

    return (
        <View style={[globalStyles.screenBackground, { flex: 1, paddingHorizontal: 14 }]}>
            <Text style={styles.header}>Memorate</Text>
            <View style={styles.categoryContainer}>
                <CategoryFilter
                    categories={['All', ...categories]}
                    selected={category}
                    onSelect={setCategory}
                />
            </View>

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <NoteItem note={item} onEdit={openEdit} onDelete={handleDelete} />
                )}
                contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNote', {})}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;