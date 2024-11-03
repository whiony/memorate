import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Note, RootStackParamList } from '../navigation/AppNavigator';
import { styles } from '../styles/AddNoteScreen.styles';

interface AddNoteScreenProps {
    route: RouteProp<RootStackParamList, 'AddNote'>;
    categories: string[];
    addCategory: (newCategory: string) => Promise<void>;
}

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ route, categories, addCategory }) => {
    const navigation = useNavigation();
    const existingNote = route.params?.note as Note | undefined;

    const [name, setName] = useState(existingNote?.name || '');
    const [comment, setComment] = useState(existingNote?.comment || '');
    const [rating, setRating] = useState(existingNote?.rating?.toString() || '');
    const [image, setImage] = useState<string | null>(existingNote?.image || null);
    const [category, setCategory] = useState(existingNote?.category || categories[0] || '');
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        if (categories.length > 0 && !existingNote) {
            setCategory(categories[0]);
        }
    }, [categories, existingNote]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const saveNote = async () => {
        try {
            const noteData = {
                name,
                comment,
                rating: parseFloat(rating),
                category,
                image,
                created: new Date(),
            };

            if (existingNote) {
                const noteRef = doc(firestore, 'reviews', existingNote.id);
                await updateDoc(noteRef, noteData);
            } else {
                await addDoc(collection(firestore, 'reviews'), noteData);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the note to Firestore.', error);
        }
    };

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            try {
                await addCategory(newCategory.trim());
                setCategory(newCategory.trim());
                setNewCategory('');
                setShowCategoryInput(false);
            } catch (error) {
                console.error('Failed to add category:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the name of the product"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Comment:</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a comment"
                value={comment}
                onChangeText={setComment}
            />

            <Text style={styles.label}>Rating:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a rating from 1 to 5"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />

            <Text style={styles.label}>Category:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
                {categories
                    .filter(cat => cat && typeof cat === 'string' && cat.trim() !== '')
                    .map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setCategory(cat)}
                            style={[
                                styles.categoryButton,
                                category === cat && styles.selectedCategoryButton,
                            ]}
                        >
                            <Text style={styles.categoryButtonText}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>

            {!showCategoryInput && (
                <TouchableOpacity onPress={() => setShowCategoryInput(true)} style={styles.addCategoryButton}>
                    <Text style={styles.addCategoryButtonText}>+ Add Category</Text>
                </TouchableOpacity>
            )}

            {showCategoryInput && (
                <View style={styles.newCategoryContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new category"
                        value={newCategory}
                        onChangeText={setNewCategory}
                    />
                    <TouchableOpacity onPress={handleAddCategory} style={styles.roundButton}>
                        <Text style={styles.buttonText}>Save Category</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={pickImage} style={styles.roundButton}>
                <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            <TouchableOpacity onPress={saveNote} style={styles.roundButton}>
                <Text style={styles.buttonText}>Save Note</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddNoteScreen;
