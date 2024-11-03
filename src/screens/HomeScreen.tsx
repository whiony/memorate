import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Note, RootStackParamList } from '../navigation/AppNavigator';
import { collection, getDocs, query, where, deleteDoc, doc, DocumentData, Query } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    categories: string[];
}

const screenWidth = Dimensions.get('window').width;

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
            const notesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Note[];
            setNotes(notesList);
        } catch (error) {
            console.error('Error fetching notes: ', error);
        }
    };

    const handleDelete = async (noteId: string) => {
        try {
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

    const renderNote = ({ item }: { item: Note }) => (
        <View style={styles.note}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setVisibleMenuId(item.id)}>
                <Text style={styles.menuText}>⋮</Text>
            </TouchableOpacity>
            <Menu
                visible={visibleMenuId === item.id}
                onRequestClose={() => setVisibleMenuId(null)}
                anchor={<View />}
            >
                <MenuItem onPress={() => { setVisibleMenuId(null); openEditNote(item); }}>Edit</MenuItem>
                <MenuDivider />
                <MenuItem onPress={() => { setVisibleMenuId(null); handleDelete(item.id); }}>Delete</MenuItem>
            </Menu>
            <Text style={styles.name}>{item.name}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedCategoryButton]}
                    onPress={() => setSelectedCategory('All')}
                >
                    <Text style={styles.categoryButtonText}>All</Text>
                </TouchableOpacity>
                {categories.map((cat, index) => (
                    <TouchableOpacity
                        key={`category-${index}`}
                        style={[styles.categoryButton, selectedCategory === cat && styles.selectedCategoryButton]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text style={styles.categoryButtonText}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.flatListContentContainer}
                renderItem={renderNote}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginBottom: 0,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginRight: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#f4511e',
    },
    categoryButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    flatListContentContainer: {
        paddingVertical: 10,
    },
    note: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        width: screenWidth / 2 - 30,
        position: 'relative',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 10,
    },
    rating: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    menuText: {
        fontSize: 18,
        color: '#666',
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
