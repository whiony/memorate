import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './ImagePicker.styles'

interface ImagePickerProps {
    images: string[]
    onPickImages: () => void
    onRemoveImage: (index: number) => void
    onEditImage?: (index: number) => void
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
    images,
    onPickImages,
    onRemoveImage,
    onEditImage,
}) => (
    <View style={styles.container}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imagesContainer}
        >
            {images.map((imageUri, index) => (
                <View key={index} style={styles.imageWrapper}>
                    <TouchableOpacity 
                        onPress={() => onEditImage?.(index)}
                        activeOpacity={0.8}
                        style={styles.imageContainer}
                    >
                        <Image source={{ uri: imageUri }} style={styles.image} />
                        {onEditImage && (
                            <View style={styles.editOverlay}>
                                <Ionicons name="create-outline" size={20} color="#FFF" />
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.removeButton} 
                        onPress={() => onRemoveImage(index)}
                    >
                        <Ionicons name="close-circle" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            ))}
            
            {images.length < 5 && (
                <TouchableOpacity style={styles.addButton} onPress={onPickImages}>
                    <Ionicons name="add" size={32} color="#6366F1" />
                    <Text style={styles.addButtonText}>
                        {images.length === 0 ? 'Add photos' : `Add more\n(${images.length}/5)`}
                    </Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    </View>
)

export default ImagePickerComponent
