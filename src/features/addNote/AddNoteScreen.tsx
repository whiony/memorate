import React, { FC, useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { collection, addDoc, doc, updateDoc, deleteField } from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import type { RootStackParamList, NavNote, Note } from '@/navigation/AppNavigator'
import { uploadToCloudinary } from '@/utils/uploadToCloudinary'
import TitleInput from './components/TitleInput/TitleInput'
import ImagePickerComponent from '@/ui/ImagePicker/ImagePicker'
import PriceCurrencyInput from './components/PriceCurrencyInput/PriceCurrencyInput'
import CommentInput from './components/CommentInput/CommentInput'
import CategorySection from './components/CategorySection/CategorySection'
import SaveButton from '@/ui/Button/SaveButton'
import StarRating from '@/ui/Rating/StarRating'
import FullscreenLoader from '@/ui/Loader/FullscreenLoader'

import { styles } from './AddNoteScreen.styles'
import { globalStyles } from '@/theme'
import { useCategories } from '@/hooks/useCategories'
import { deleteFromCloudinary } from '@/utils/deleteFromCloudinary'
import { categoryColorOptions } from '@/utils/categoryColors'

type AddNoteRouteProp = RouteProp<RootStackParamList, 'AddNote'>
type AddNoteNavigationProp = StackNavigationProp<RootStackParamList, 'AddNote'>

interface Props {
    route: AddNoteRouteProp
}

const CLOUD_NAME = process.env.CLOUD_NAME!
const UPLOAD_PRESET = process.env.UPLOAD_PRESET!
const MAX_TITLE_LENGTH = 50;

type Currency = '€' | '$' | '₴'

const AddNoteScreen: FC<Props> = () => {
    const navigation = useNavigation<AddNoteNavigationProp>()
    const route = useRoute<AddNoteRouteProp>()

    const navNote = route.params?.note as NavNote | undefined
    const existingNote: Note | undefined = navNote
        ? { ...navNote, created: new Date(navNote.created) }
        : undefined

    const [title, setTitle] = useState(existingNote?.name ?? '')
    const [comment, setComment] = useState(existingNote?.comment ?? '')
    const [rating, setRating] = useState(existingNote?.rating ?? 0)
    const [price, setPrice] = useState(
        existingNote?.price != null ? existingNote.price.toString().replace('.', ',') : ''
    )
    const [currency, setCurrency] = useState<Currency>(existingNote?.currency ?? '€')
    const [image, setImage] = useState<string | null>(existingNote?.image ?? null)
    const [loadingImage, setLoadingImage] = useState(false)
    const [saving, setSaving] = useState(false)

    const { categories, addCategory, loading: addingCategory } = useCategories()
    const categoryNames = categories.map(c => c.name)
    const [category, setCategory] = useState(existingNote?.category ?? '')
    const [openDropdown, setOpenDropdown] = useState(false)
    const [showCategoryInput, setShowCategoryInput] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [newCategoryColor, setNewCategoryColor] = useState<string>(categoryColorOptions[0])

    const scrollRef = useRef<KeyboardAwareScrollView>(null)

    useEffect(() => {
        if (!category && categoryNames.length) {
            setCategory(categoryNames[0])
        }
    }, [categoryNames, category])

    const toggleCurrency = useCallback(() => {
        const opts: Currency[] = ['€', '$', '₴']
        const idx = opts.indexOf(currency)
        setCurrency(opts[(idx + 1) % opts.length])
    }, [currency])

    const pickImage = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        })
        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
        }
    }, [])

    const handleAddCategory = useCallback(async () => {
        if (newCategory.trim()) {
            setShowCategoryInput(false)
            await addCategory(newCategory.trim(), newCategoryColor)
            setCategory(newCategory.trim())
            setNewCategory('')
            setNewCategoryColor(categoryColorOptions[0])
        } else {
            setShowCategoryInput(false)
        }
    }, [newCategory, newCategoryColor, addCategory])

    const handleSave = useCallback(async () => {
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

            if (existingNote?.image && !image) {
                await deleteFromCloudinary(existingNote.image)
            }

            let imageUrl: string | null = image
            if (image?.startsWith('data:image')) {
                setLoadingImage(true)
                imageUrl = await uploadToCloudinary(image, CLOUD_NAME, UPLOAD_PRESET)
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
                payload.price = parseFloat(price.replace(',', '.'))
            }
            payload.currency = currency
            if (imageUrl) payload.image = imageUrl
            else if (existingNote?.image && !image) payload.image = deleteField() as any

            if (existingNote) {
                await updateDoc(doc(firestore, 'reviews', existingNote.id), payload)
            } else {
                await addDoc(collection(firestore, 'reviews'), payload)
            }

            Alert.alert(
                'Success',
                existingNote ? 'Note updated!' : 'Note saved!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            )
        } catch (error) {
            console.error('Save failed', error)
            Alert.alert('Error', 'Save failed. Try again.')
        } finally {
            setSaving(false)
        }
    }, [title, comment, rating, category, price, currency, image, existingNote, navigation])

    const handleTitleChange = useCallback((text: string) => {
        setTitle(text.slice(0, MAX_TITLE_LENGTH))
    }, [])

    const handleCommentFocus = useCallback((event: { nativeEvent: { target: Object } }) => {
        scrollRef.current?.scrollToFocusedInput(event.nativeEvent.target)
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {existingNote ? 'Edit Note' : 'New Note'}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <KeyboardAwareScrollView ref={scrollRef} enableAutomaticScroll>
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
                    <CommentInput
                        comment={comment}
                        onChangeComment={setComment}
                        onFocus={handleCommentFocus}
                    />
                    <CategorySection
                        category={category}
                        setCategory={setCategory}
                        categories={categoryNames}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                        showCategoryInput={showCategoryInput}
                        setShowCategoryInput={setShowCategoryInput}
                        newCategory={newCategory}
                        setNewCategory={setNewCategory}
                        newCategoryColor={newCategoryColor}
                        setNewCategoryColor={setNewCategoryColor}
                        handleAddCategory={handleAddCategory}
                        loading={addingCategory}
                    />
                    <SaveButton
                        onPress={handleSave}
                        title={existingNote ? 'Update' : 'Save'}
                        disabled={!title.trim() || rating <= 0 || saving || loadingImage}
                    />
                    {(saving || loadingImage) && <FullscreenLoader />}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default AddNoteScreen

