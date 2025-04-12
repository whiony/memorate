import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import { RootStackParamList, Note } from '../navigation/AppNavigator';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';

import TitleInput from '../components/TitleInput';
import ImagePickerComponent from '../components/ImagePickerComponent';
import PriceCurrencyInput from '../components/PriceCurrencyInput';
import CommentInput from '../components/CommentInput';
import CategorySection from '../components/CategorySection';
import SaveButton from '../components/SaveButton';
import StarRating from '../components/StarRating';
import FullscreenLoader from '../components/FullscreenLoader';
import { styles } from '../styles/AddNoteScreen.styles';

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

    // Categories block
    const [category, setCategory] = useState(existingNote?.category || '');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        if (!category && categories.length) {
            setCategory(categories[0]);
        }
    }, [categories]);

    // Currency switch
    const currencyOptions: Currency[] = ['€', '$', '₴'];
    const toggleCurrency = () => {
        const currentIndex = currencyOptions.indexOf(currency);
        setCurrency(currencyOptions[(currentIndex + 1) % currencyOptions.length]);
    };

    // Pick image
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

    // Add new category
    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await addCategory(newCategory.trim());
            setCategory(newCategory.trim());
            setNewCategory('');
        }
        setShowCategoryInput(false);
    };

    // Saving
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
                await updateDoc(doc(firestore, 'reviews', existingNote.id), noteData);
            } else {
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
        <KeyboardAwareScrollView style={styles.screen} enableOnAndroid extraScrollHeight={20}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} nestedScrollEnabled>
                <TitleInput value={title} onChange={setTitle} />
                <ImagePickerComponent image={image} onPickImage={pickImage} />
                <StarRating rating={rating} onChange={setRating} />
                <PriceCurrencyInput
                    price={price}
                    onChangePrice={setPrice}
                    currency={currency}
                    onToggleCurrency={toggleCurrency}
                />
                <CommentInput comment={comment} onChangeComment={setComment} />
                <CategorySection
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    showCategoryInput={showCategoryInput}
                    setShowCategoryInput={setShowCategoryInput}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    handleAddCategory={handleAddCategory}
                    loading={loading}
                />
                <SaveButton onPress={handleSave} title={existingNote ? 'Update' : 'Save'} />
                {loading && <FullscreenLoader />}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default AddNoteScreen;
