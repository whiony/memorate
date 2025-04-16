// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Note, RootStackParamList } from '../../navigation/AppNavigator';
import { collection, getDocs, query, where, deleteDoc, doc, DocumentData, Query } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary';
import { useCategories } from '../../hooks/useCategories';
import CategorySection from '../addNote/CategorySection';
import SortingDropDown from './SortingDropDown'; // <-- наш новый компонент
import NoteItem from './NoteItem';
import { globalStyles } from '../../theme/theme';
import { styles } from './HomeScreen.styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<any> = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [notes, setNotes] = useState<Note[]>([]);
    const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);

    // ============ Состояние для CategorySection ============
    const [category, setCategory] = useState('All');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    // Подтягиваем категории из контекста
    const { categories, addCategory, loading } = useCategories();

    // ============ Состояние для сортировки ============
    const [sortBy, setSortBy] = useState<'date' | 'price'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [openSortDropdown, setOpenSortDropdown] = useState(false);

    const fetchNotes = async () => {
        try {
            let notesQuery: Query<DocumentData> = collection(firestore, 'reviews');
            if (category !== 'All') {
                notesQuery = query(notesQuery, where('category', '==', category));
            }

            const querySnapshot = await getDocs(notesQuery);
            const loadedNotes = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    created: data.created?.toDate
                        ? data.created.toDate()
                        : new Date(data.created || Date.now()),
                } as Note;
            });

            // Сортируем в зависимости от sortBy и sortOrder
            if (sortBy === 'date') {
                loadedNotes.sort((a, b) => {
                    const aTime = a.created?.getTime() ?? 0;
                    const bTime = b.created?.getTime() ?? 0;
                    return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
                });
            } else {
                // sortBy === 'price'
                loadedNotes.sort((a, b) => {
                    const aPrice = a.price ?? 0;
                    const bPrice = b.price ?? 0;
                    return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
                });
            }

            setNotes(loadedNotes);
        } catch (error) {
            console.error('Error fetching notes: ', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [category, sortBy, sortOrder]);

    const handleDelete = async (noteId: string) => {
        try {
            const note = notes.find((n) => n.id === noteId);
            if (note?.image?.startsWith('https://res.cloudinary.com')) {
                await deleteFromCloudinary(note.image);
            }
            await deleteDoc(doc(firestore, 'reviews', noteId));
            setNotes((prev) => prev.filter((n) => n.id !== noteId));
            Alert.alert('Success', 'Note deleted successfully.');
        } catch (error) {
            console.error('Error deleting note: ', error);
        }
    };

    const openEditNote = (note: Note) => {
        navigation.navigate('AddNote', { note });
    };

    return (
        <View style={[globalStyles.screenBackground, { flex: 1 }]}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    paddingHorizontal: 16,
                    marginTop: 12,
                    zIndex: 2000,
                }}
            >
                <View style={{ flex: 1 }}>
                    <CategorySection
                        category={category}
                        setCategory={setCategory}
                        categories={['All', ...categories]}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        showCategoryInput={showCategoryInput}
                        setShowCategoryInput={setShowCategoryInput}
                        newCategory={newCategory}
                        setNewCategory={setNewCategory}
                        handleAddCategory={async () => await addCategory(newCategory)}
                        loading={loading}
                        editableCategory={false}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <SortingDropDown
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        openSortDropdown={openSortDropdown}
                        setOpenSortDropdown={setOpenSortDropdown}
                    />
                </View>
            </View>

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onEdit={openEditNote}
                        onDelete={handleDelete}
                        visibleMenuId={visibleMenuId}
                        setVisibleMenuId={setVisibleMenuId}
                    />
                )}
                contentContainerStyle={styles.flatListContentContainer}
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
