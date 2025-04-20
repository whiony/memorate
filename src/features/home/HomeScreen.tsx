import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
    Query,
    DocumentData,
} from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary';
import { useCategories } from '../../hooks/useCategories';
import { Note, RootStackParamList } from '../../navigation/AppNavigator';
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

    useEffect(() => {
        let base: Query<DocumentData> = collection(firestore, 'reviews');
        if (category !== 'All') {
            base = query(base, where('category', '==', category));
        }
        const q = query(base, orderBy('created', 'desc'));

        const unsub = onSnapshot(q, snap => {
            const loaded = snap.docs.map(d => {
                const data = d.data();
                return {
                    id: d.id,
                    ...data,
                    created: data.created?.toDate
                        ? data.created.toDate()
                        : new Date(data.created as any),
                } as Note;
            });
            setNotes(loaded);
        });

        return () => unsub();
    }, [category]);

    const handleDelete = async (noteId: string) => {
        const note = notes.find(n => n.id === noteId);
        if (note?.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image);
        }
        await deleteDoc(doc(firestore, 'reviews', noteId));
    };

    const openEdit = (note: Note) =>
        navigation.navigate('AddNote', { note });

    return (
        <View
            style={[
                globalStyles.screenBackground,
                { flex: 1, paddingHorizontal: 14 },
            ]}
        >
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
