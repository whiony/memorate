import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../services/firebaseConfig';
import { RootStackParamList, Note } from '../../navigation/AppNavigator';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';

import TitleInput from './TitleInput';
import ImagePickerComponent from '../../components/ImagePickerComponent';
import PriceCurrencyInput from './PriceCurrencyInput';
import CommentInput from './CommentInput';
import CategorySection from './CategorySection';
import SaveButton from '../../components/SaveButton';
import StarRating from '../../components/StarRating';
import FullscreenLoader from '../../components/FullscreenLoader';
import { styles } from './AddNoteScreen.styles';
import { globalStyles } from '../../theme/theme';
import { useCategories } from '../../hooks/useCategories';

type Currency = '€' | '$' | '₴';

interface Props {
    route: RouteProp<RootStackParamList, 'AddNote'>;
}

const CLOUD_NAME = process.env.CLOUD_NAME;
const UPLOAD_PRESET = process.env.UPLOAD_PRESET;

const AddNoteScreen: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const existingNote = route.params?.note;

    const [title, setTitle] = useState(existingNote?.name || '');
    const [comment, setComment] = useState(existingNote?.comment || '');
    const [rating, setRating] = useState(existingNote?.rating || 0);
    const [price, setPrice] = useState(existingNote?.price?.toString() || '');
    const [currency, setCurrency] = useState<Currency>(existingNote?.currency || '€');
    const [image, setImage] = useState<string | null>(existingNote?.image || null);
    const [loadingImage, setLoading] = useState(false);
    const [loadingNote, setLoadingNote] = useState(false);

    const [category, setCategory] = useState(existingNote?.category || '');
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const { categories, addCategory, loading } = useCategories();

    useEffect(() => {
        if (!category && categories.length) {
            setCategory(categories[0]);
        }
    }, [categories]);

    const currencyOptions: Currency[] = ['€', '$', '₴'];
    const toggleCurrency = () => {
        const currentIndex = currencyOptions.indexOf(currency);
        setCurrency(currencyOptions[(currentIndex + 1) % currencyOptions.length]);
    };

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

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await addCategory(newCategory.trim());
            setCategory(newCategory.trim());
            setNewCategory('');
        }
        setShowCategoryInput(false);
    };

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Oops', 'Name is required');
            return;
        }
        if (rating <= 0) {
            Alert.alert('Oops', 'Please give a rating');
            return;
        }

        try {
            setLoading(true);
            let imageUrl: string | null = image;
            if (image?.startsWith('data:image')) {
                imageUrl = await uploadToCloudinary(image, CLOUD_NAME, UPLOAD_PRESET);
            }

            const payload: Partial<Note> = {
                name: title,
                comment,
                rating,
                category,
                created: new Date(),
            };
            if (price) payload.price = parseFloat(price);
            if (currency) payload.currency = currency;
            if (imageUrl) payload.image = imageUrl;

            if (existingNote) {
                await updateDoc(doc(firestore, 'reviews', existingNote.id), payload);
            } else {
                await addDoc(collection(firestore, 'reviews'), payload);
            }
            navigation.goBack();
        } catch (e) {
            console.error('Save failed', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={[globalStyles.screenBackground, styles.screen]}
            enableOnAndroid
            extraScrollHeight={20}
        >
            <ScrollView contentContainerStyle={[globalStyles.container, { paddingBottom: 40, }]} nestedScrollEnabled>
                <View style={{ paddingHorizontal: 16, flexDirection: "column", gap: 8 }}>
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
                        loading={loadingNote || loading}
                    />
                    <SaveButton
                        onPress={handleSave}
                        title={existingNote ? 'Update' : 'Save'}
                        disabled={!title.trim() || rating <= 0}
                    />
                    {(loadingNote || loading) && <FullscreenLoader />}
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default AddNoteScreen;
