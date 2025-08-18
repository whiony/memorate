import React, { FC, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from 'react-native'
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
import { LinearGradient } from 'expo-linear-gradient'

import { createStyles } from './AddNoteScreen.styles'
import { useCategories } from '@/hooks/useCategories'
import { deleteFromCloudinary } from '@/utils/deleteFromCloudinary'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { lightTheme, darkTheme } from '@/theme/colors'

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
    const { user } = useAuth()
    const { isDark } = useTheme()
    const colors = isDark ? darkTheme : lightTheme
    const styles = createStyles(colors)

    const navNote = route.params?.note as NavNote | undefined
    const existingNote: Note | undefined = navNote
        ? {
            ...navNote,
            created: new Date(navNote.created),
            edited: navNote.edited ? new Date(navNote.edited) : undefined,
        }
        : undefined

    const [title, setTitle] = useState(existingNote?.name ?? '')
    const [comment, setComment] = useState(existingNote?.comment ?? '')
    const [rating, setRating] = useState(existingNote?.rating ?? 0)
    const [price, setPrice] = useState(
        existingNote?.price != null ? existingNote.price.toString().replace('.', ',') : ''
    )
    const [currency, setCurrency] = useState<Currency>(existingNote?.currency ?? '€')
    const [images, setImages] = useState<string[]>(() => {
        if (existingNote?.images && existingNote.images.length > 0) {
            return existingNote.images
        } else if (existingNote?.image) {
            return [existingNote.image]
        }
        return []
    })
    const [loadingImage, setLoadingImage] = useState(false)
    const [saving, setSaving] = useState(false)

    const { categories, addCategory, loading: addingCategory } = useCategories();
    const categoryNames = categories.map(c => c.name);
    const [selectedTags, setSelectedTags] = useState<string[]>(existingNote?.tags ?? []);
    const [newTag, setNewTag] = useState('');

    const scrollRef = useRef<KeyboardAwareScrollView>(null)

    const toggleCurrency = useCallback(() => {
        const opts: Currency[] = ['€', '$', '₴']
        const idx = opts.indexOf(currency)
        setCurrency(opts[(idx + 1) % opts.length])
    }, [currency])

    const pickImages = useCallback(async () => {
        if (images.length >= 5) {
            Alert.alert('Limit reached', 'You can add up to 5 images maximum.')
            return
        }

        Alert.alert(
            'Add Photos',
            'Choose how you want to add photos:',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Quick Add (Multiple)',
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ['images'],
                            allowsEditing: false,
                            quality: 0.7,
                            base64: true,
                            allowsMultipleSelection: true,
                            selectionLimit: 5 - images.length,
                        })

                        if (!result.canceled) {
                            const newImages = result.assets.map(asset =>
                                `data:image/jpeg;base64,${asset.base64}`
                            )
                            setImages(prev => [...prev, ...newImages].slice(0, 5))
                        }
                    }
                },
                {
                    text: 'Add & Crop (Single)',
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ['images'],
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 0.7,
                            base64: true,
                        })

                        if (!result.canceled) {
                            const newImage = `data:image/jpeg;base64,${result.assets[0].base64}`
                            setImages(prev => [...prev, newImage].slice(0, 5))
                        }
                    }
                }
            ]
        )
    }, [images.length])

    const removeImage = useCallback((indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove))
    }, [])

    const editImage = useCallback(async (indexToEdit: number) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        })

        if (!result.canceled) {
            const editedImage = `data:image/jpeg;base64,${result.assets[0].base64}`
            setImages(prev => prev.map((img, index) =>
                index === indexToEdit ? editedImage : img
            ))
        }
    }, [])

    const handleAddCategory = useCallback(async () => {
        const tag = newTag.trim();
        if (!tag) return;

        if (!categoryNames.includes(tag)) {
            await addCategory(tag);
        }

        if (!selectedTags.includes(tag)) {
            setSelectedTags(prev => [...prev, tag]);
        }

        setNewTag('');
    }, [newTag, addCategory, categoryNames, selectedTags]);


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

            if (existingNote?.image && !images.includes(existingNote.image)) {
                await deleteFromCloudinary(existingNote.image)
            }
            if (existingNote?.images) {
                for (const oldImage of existingNote.images) {
                    if (!images.includes(oldImage)) {
                        await deleteFromCloudinary(oldImage)
                    }
                }
            }

            setLoadingImage(true)
            const uploadedImages: string[] = []

            for (const img of images) {
                if (img.startsWith('data:image')) {
                    const uploadedUrl = await uploadToCloudinary(img, CLOUD_NAME, UPLOAD_PRESET)
                    uploadedImages.push(uploadedUrl)
                } else {
                    uploadedImages.push(img)
                }
            }
            setLoadingImage(false)

            const now = new Date()

            if (!user) {
                Alert.alert('Error', 'You must be logged in to save notes')
                return
            }

            const payload: any = {
                name: title,
                comment,
                rating,
                tags: selectedTags,
                userId: user.uid,
            }
            if (price) {
                payload.price = parseFloat(price.replace(',', '.'))
            }
            payload.currency = currency

            if (uploadedImages.length > 0) {
                payload.images = uploadedImages
            }

            if (existingNote) {
                payload.edited = now
                if (uploadedImages.length > 0) {
                    payload.image = deleteField() as any
                } else {
                    payload.images = deleteField() as any
                    payload.image = deleteField() as any
                }
                await updateDoc(doc(firestore, 'reviews', existingNote.id), payload)
            } else {
                payload.created = now
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
    }, [title, comment, rating, price, currency, images, existingNote, navigation, selectedTags])

    const handleTitleChange = useCallback((text: string) => {
        setTitle(text.slice(0, MAX_TITLE_LENGTH))
    }, [])

    const handleCommentFocus = useCallback((event: { nativeEvent: { target: Object } }) => {
        scrollRef.current?.scrollToFocusedInput(event.nativeEvent.target)
    }, [])

    return (
        <LinearGradient
            colors={colors.background}
            style={{ flex: 1 }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        {existingNote ? 'Edit Note' : 'New Note'}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="home-outline" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView ref={scrollRef} enableAutomaticScroll style={{ flex: 1 }}>
                    <View style={styles.screen}>
                        <TitleInput value={title} onChange={handleTitleChange} />
                        <ImagePickerComponent
                            images={images}
                            onPickImages={pickImages}
                            onRemoveImage={removeImage}
                            onEditImage={editImage}
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
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            allCategories={categoryNames}
                            newTag={newTag}
                            setNewTag={setNewTag}
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
        </LinearGradient>
    )
}

export default AddNoteScreen

