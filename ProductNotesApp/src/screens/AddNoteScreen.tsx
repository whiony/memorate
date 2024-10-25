import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddNoteScreen = () => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleSave = () => {
        // Here will be the logic for saving the note
        console.log('Note saved:', { comment, rating, image });
    };

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

            <Button title="Pick Image" onPress={pickImage} />

            {image && (
                <Image source={{ uri: image }} style={styles.image} />
            )}

            <Button title="Save Note" onPress={handleSave} />
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
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});

export default AddNoteScreen;