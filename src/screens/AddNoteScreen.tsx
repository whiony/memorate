import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

interface AddNoteScreenProps {
    categories: string[];
    addCategory: (newCategory: string) => void;
}

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ categories, addCategory }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [category, setCategory] = useState(categories[0]);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const navigation = useNavigation();

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
            const newNote = {
                comment,
                rating,
                category,
                image,
                created: new Date(),
            };

            await addDoc(collection(firestore, 'reviews'), newNote);
            console.log('Note saved to Firestore!');
            navigation.goBack();
        } catch (error) {
            console.error('Failed to save the note to Firestore.', error);
        }
    };

    const handleAddCategory = () => {
        if (newCategory) {
            addCategory(newCategory);
            setCategory(newCategory);
            setNewCategory('');
            setShowCategoryInput(false);
        }
    };

    return (
        <View style={styles.container}>
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
                {categories.map((cat) => (
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

            {/* Button to show new category input field */}
            {!showCategoryInput && (
                <TouchableOpacity onPress={() => setShowCategoryInput(true)} style={styles.addCategoryButton}>
                    <Text style={styles.addCategoryButtonText}>+ Add Category</Text>
                </TouchableOpacity>
            )}

            {/* New category input field and save button */}
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

            {/* Image picker button */}
            <TouchableOpacity onPress={pickImage} style={styles.roundButton}>
                <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            {/* Save note button */}
            <TouchableOpacity onPress={saveNote} style={styles.roundButton}>
                <Text style={styles.buttonText}>Save Note</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    categoryList: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#f4511e',
    },
    categoryButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    addCategoryButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
        backgroundColor: '#f4511e',
        borderRadius: 20,
    },
    addCategoryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    newCategoryContainer: {
        marginBottom: 20,
    },
    roundButton: {
        backgroundColor: '#f4511e',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
});

export default AddNoteScreen;
