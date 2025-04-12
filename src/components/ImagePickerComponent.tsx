import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { styles } from './ImagePickerComponent.styles';

interface ImagePickerComponentProps {
    image: string | null;
    onPickImage: () => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ image, onPickImage }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={onPickImage}>
        {image ? (
            <Image source={{ uri: image }} style={styles.image} />
        ) : (
            <Text style={styles.imagePlaceholder}>Tap to pick image</Text>
        )}
    </TouchableOpacity>
);

export default ImagePickerComponent;
