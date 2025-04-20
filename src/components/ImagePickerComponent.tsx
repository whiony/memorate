import React from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './ImagePickerComponent.styles'

interface ImagePickerComponentProps {
    image: string | null
    onPickImage: () => void
    onRemoveImage: () => void
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
    image,
    onPickImage,
    onRemoveImage,
}) => (
    <View style={styles.container}>
        {image ? (
            <>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity style={styles.removeButton} onPress={onRemoveImage}>
                    <Ionicons name="close-circle" size={28} color="#FFF" />
                </TouchableOpacity>
            </>
        ) : (
            <TouchableOpacity style={styles.placeholder} onPress={onPickImage}>
                <Text style={styles.imagePlaceholder}>Tap to pick image</Text>
            </TouchableOpacity>
        )}
    </View>
)

export default ImagePickerComponent
