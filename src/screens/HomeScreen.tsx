import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { collection, getDocs, query, where, DocumentData, Query } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    categories: string[];
}

interface Note {
    id: string;
    comment: string;
    rating: number;
    image?: string;
    category: string;
}

const screenWidth = Dimensions.get('window').width;

const HomeScreen: React.FC<HomeScreenProps> = ({ categories }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
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
            }));
            setNotes(notesList as Note[]);
        } catch (error) {
            console.error('Error fetching notes: ', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [selectedCategory])
    );

    return (
        <View style={styles.container}>
            {/* Category filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedCategoryButton]}
                    onPress={() => setSelectedCategory('All')}
                >
                    <Text style={styles.categoryButtonText}>All</Text>
                </TouchableOpacity>
                {categories
                    .filter((cat) => cat && typeof cat === 'string' && cat.trim() !== '')
                    .map((cat, index) => (
                        <TouchableOpacity
                            key={`category-${index}`}
                            style={[styles.categoryButton, selectedCategory === cat && styles.selectedCategoryButton]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={styles.categoryButtonText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>

            {/* Notes list */}
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

            {/* Add Note button */}
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
