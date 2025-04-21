import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    findNodeHandle,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    useNavigation,
    RouteProp,
    NavigationProp,
} from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteField,
} from 'firebase/firestore'
import { firestore } from '../../services/firebaseConfig'
import { RootStackParamList, Note } from '../../navigation/AppNavigator'
import { uploadToCloudinary } from '../../utils/uploadToCloudinary'

import TitleInput from './TitleInput'
import ImagePickerComponent from '../../components/ImagePickerComponent'
import PriceCurrencyInput from './PriceCurrencyInput'
import CommentInput from './CommentInput'
import CategorySection from './CategorySection'
import SaveButton from '../../components/SaveButton'
import StarRating from '../../components/StarRating'
import FullscreenLoader from '../../components/FullscreenLoader'

import { styles } from './AddNoteScreen.styles'
import { globalStyles } from '../../theme/theme'
import { useCategories } from '../../hooks/useCategories'
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary'

type Currency = '€' | '$' | '₴'

interface Props {
    route: RouteProp<RootStackParamList, 'AddNote'>
}

const CLOUD_NAME = process.env.CLOUD_NAME!
const UPLOAD_PRESET = process.env.UPLOAD_PRESET!
const MAX_TITLE_LENGTH = 50;

const AddNoteScreen: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const existingNote = route.params?.note

    const [title, setTitle] = useState(existingNote?.name || '')
    const [comment, setComment] = useState(existingNote?.comment || '')
    const [rating, setRating] = useState(existingNote?.rating || 0)
    const [price, setPrice] = useState(
        existingNote?.price != null
            ? existingNote.price.toString().replace('.', ',')
            : ''
    )
    const [currency, setCurrency] = useState<Currency>(
        existingNote?.currency || '€'
    )
    const [image, setImage] = useState<string | null>(
        existingNote?.image || null
    )
    const [loadingImage, setLoadingImage] = useState(false)
    const [saving, setSaving] = useState(false)

    const [category, setCategory] = useState(
        existingNote?.category || ''
    )
    const [openDropdown, setOpenDropdown] = useState(false)
    const [showCategoryInput, setShowCategoryInput] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const { categories, addCategory, loading: addingCategory } =
        useCategories()

    const scrollRef = useRef<KeyboardAwareScrollView | null>(null)

    useEffect(() => {
        if (!category && categories.length) {
            setCategory(categories[0])
        }
    }, [categories])

    const currencyOptions: Currency[] = ['€', '$', '₴']
    const toggleCurrency = () => {
        const idx = currencyOptions.indexOf(currency)
        setCurrency(currencyOptions[(idx + 1) % currencyOptions.length])
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        })
        if (!result.canceled) {
            setImage(
                `data:image/jpeg;base64,${result.assets[0].base64}`
            )
        }
    }

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await addCategory(newCategory.trim())
            setCategory(newCategory.trim())
            setNewCategory('')
        }
        setShowCategoryInput(false)
    }

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Name is required')
            return
        }
        if (rating <= 0) {
            Alert.alert('Please give a rating')
            return
        }

        try {
            setSaving(true)
            if (existingNote && existingNote.image && !image) {
                await deleteFromCloudinary(existingNote.image)
            }

            let imageUrl: string | null = image
            if (image?.startsWith('data:image')) {
                setLoadingImage(true)
                imageUrl = await uploadToCloudinary(
                    image,
                    CLOUD_NAME,
                    UPLOAD_PRESET
                )
                setLoadingImage(false)
            }

            const payload: Partial<Note> = {
                name: title,
                comment,
                rating,
                category,
                created: new Date(),
            }
            if (price) {
                const normalized = price.replace(',', '.')
                payload.price = parseFloat(normalized)
            }
            if (currency) payload.currency = currency
            if (imageUrl) {
                payload.image = imageUrl
            } else if (existingNote && existingNote.image && !image) {
                payload.image = deleteField() as any
            }

            if (existingNote) {
                await updateDoc(
                    doc(firestore, 'reviews', existingNote.id),
                    payload
                )
            } else {
                await addDoc(
                    collection(firestore, 'reviews'),
                    payload
                )
            }

            Alert.alert(
                'Success',
                existingNote ? 'Note updated!' : 'Note saved!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            )
        } catch (e) {
            console.error('Save failed', e)
            Alert.alert('Error', 'Save failed. Try again.')
        } finally {
            setSaving(false)
        }
    }

    const handleTitleChange = (t: string) => {
        setTitle(t.length <= MAX_TITLE_LENGTH ? t : t.substr(0, MAX_TITLE_LENGTH));
    };

    return (
        <>
            <SafeAreaView >
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {existingNote ? 'Edit Note' : 'New Note'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Ionicons name="home-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView ref={ref => { scrollRef.current = ref }} enableAutomaticScroll>
                    <View style={[globalStyles.screenBackground, styles.screen]}>
                        <TitleInput value={title} onChange={handleTitleChange} />
                        <ImagePickerComponent
                            image={image}
                            onPickImage={pickImage}
                            onRemoveImage={() => setImage(null)}
                        />
                        <StarRating rating={rating} onChange={setRating} />
                        <PriceCurrencyInput
                            price={price}
                            onChangePrice={setPrice}
                            currency={currency}
                            onToggleCurrency={toggleCurrency}
                        />
                        <CommentInput onFocus={(event) => {
                            scrollRef.current?.scrollToFocusedInput(findNodeHandle(event.target)!)
                        }} comment={comment} onChangeComment={setComment} />
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
                            loading={addingCategory}
                        />
                        <SaveButton
                            onPress={handleSave}
                            title={existingNote ? 'Update' : 'Save'}
                            disabled={
                                !title.trim() ||
                                rating <= 0 ||
                                saving ||
                                loadingImage
                            }
                        />

                        {(saving || loadingImage) && <FullscreenLoader />}
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    )
}

export default AddNoteScreen
