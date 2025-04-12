import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

import { styles } from '../styles/AddNoteScreen.styles';
import { firestore } from '../firebase/firebaseConfig';
import { RootStackParamList, Note } from '../navigation/AppNavigator';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import StarRating from './StarRating';
import FullscreenLoader from './FullscreenLoader';

interface Props {
    route: RouteProp<RootStackParamList, 'AddNote'>;
    categories: string[];
    addCategory: (category: string) => Promise<void>;
}

const CLOUD_NAME = process.env.CLOUD_NAME;
const UPLOAD_PRESET = process.env.UPLOAD_PRESET;

const AddNoteScreen: React.FC<Props> = ({ route, categories, addCategory }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const existingNote = route.params?.note;

    type Currency = '€' | '$' | '₴';

    const [title, setTitle] = useState(existingNote?.name || '');
    const [comment, setComment] = useState(existingNote?.comment || '');
    const [rating, setRating] = useState(existingNote?.rating || 0);
    const [price, setPrice] = useState(existingNote?.price?.toString() || '');
    const [currency, setCurrency] = useState<Currency>(existingNote?.currency || '€');
    const [image, setImage] = useState(existingNote?.image || null);
    const [loading, setLoading] = useState(false);

    // Блок категорий
    const [category, setCategory] = useState(existingNote?.category || '');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        if (!category && categories.length) {
            setCategory(categories[0]);
        }
    }, [categories]);

    // Переключение валют
    const currencyOptions: Currency[] = ['€', '$', '₴'];
    const toggleCurrency = () => {
        const currentIndex = currencyOptions.indexOf(currency);
        setCurrency(currencyOptions[(currentIndex + 1) % currencyOptions.length]);
    };

    // Выбор изображения
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        });
        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    // Добавление новой категории
    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await addCategory(newCategory.trim());
            setCategory(newCategory.trim());
            setNewCategory('');
        }
        setShowCategoryInput(false);
    };

    // Сохранение
    const handleSave = async () => {
        try {
            setLoading(true);

            let imageUrl = image;
            if (image?.startsWith('data:image')) {
                imageUrl = await uploadToCloudinary(image, CLOUD_NAME, UPLOAD_PRESET);
            }

            const noteData: Partial<Note> = {
                name: title,
                comment,
                rating,
                category,
                image: imageUrl || undefined,
                created: new Date(),
                price: price ? parseFloat(price) : undefined,
                currency,
            };

            if (existingNote) {
                // Редактируем
                await updateDoc(doc(firestore, 'reviews', existingNote.id), noteData);
            } else {
                // Создаём
                await addDoc(collection(firestore, 'reviews'), noteData);
            }

            navigation.goBack();
        } catch (err) {
            console.error('Save failed', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.screenContent}
            nestedScrollEnabled
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {existingNote ? 'Edit Review' : 'Add Review'}
                </Text>
            </View>

            {/* Title */}
            <View style={styles.section}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#888"
                />
            </View>

            {/* Image */}
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.imagePlaceholder}>Tap to pick image</Text>
                )}
            </TouchableOpacity>

            {/* Rating */}
            <View style={styles.section}>
                <Text style={styles.label}>Rating</Text>
                <View style={styles.starWrapper}>
                    <StarRating rating={rating} onChange={setRating} />
                </View>
            </View>

            {/* Price + Currency */}
            <View style={styles.section}>
                <Text style={styles.label}>Price</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.priceInput}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="Enter price"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={toggleCurrency} style={styles.currencyToggle}>
                        <Text style={styles.currencyText}>{currency}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Comment */}
            <View style={styles.section}>
                <Text style={styles.label}>Comment</Text>
                <TextInput
                    style={[styles.input, styles.multiline]}
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Write your comment"
                    placeholderTextColor="#888"
                    multiline
                />
            </View>

            {/* Category + Add button */}
            <View style={styles.section}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryRow}>
                    <View style={{ flex: 1 }}>
                        <DropDownPicker
                            open={openDropdown}
                            setOpen={setOpenDropdown}
                            items={categories.map((c) => ({ label: c, value: c }))}
                            value={category}
                            setValue={setCategory}
                            placeholder="Select category"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            textStyle={styles.dropdownText}
                            listMode="SCROLLVIEW"
                            scrollViewProps={{ nestedScrollEnabled: true }}
                            zIndex={2000}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowCategoryInput(!showCategoryInput)}
                        style={[styles.addCategoryButton, { marginLeft: 8 }]}
                    >
                        <Text style={styles.addCategoryButtonText}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                {/* New category field (+Add button) */}
                {showCategoryInput && (
                    <View style={[styles.row, { marginTop: 8 }]}>
                        <TextInput
                            style={[styles.input, { flex: 3 }]}
                            placeholder="Enter new category"
                            value={newCategory}
                            onChangeText={setNewCategory}
                            placeholderTextColor="#888"
                        />
                        <TouchableOpacity onPress={handleAddCategory} style={styles.roundButton}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Save */}
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>
                    {existingNote ? 'Update' : 'Save'}
                </Text>
            </TouchableOpacity>

            {loading && <FullscreenLoader />}
        </ScrollView>
    );
};

export default AddNoteScreen;
