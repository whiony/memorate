import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './CategorySection.styles';
import { globalStyles } from '@/theme/index';

interface CategorySectionProps {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    allCategories: string[];
    newTag: string;
    setNewTag: React.Dispatch<React.SetStateAction<string>>;
    handleAddCategory: () => void;
    loading: boolean;
    editable?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    selectedTags,
    setSelectedTags,
    allCategories,
    newTag,
    setNewTag,
    handleAddCategory,
    loading,
    editable = true,
}) => {
    const handleAddTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    return (
        <View style={styles.section}>
            {editable && <Text style={globalStyles.label}>Tags</Text>}

            <View style={styles.tagContainer}>
                {selectedTags.map(tag => (
                    <TouchableOpacity key={tag} style={styles.tagPill} onPress={() => removeTag(tag)}>
                        <Text style={styles.tagText}>{tag} ✕</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {editable && (
                <>
                    <View style={styles.row}>
                        <TextInput
                            placeholder="Add new tag"
                            style={styles.input}
                            value={newTag}
                            onChangeText={setNewTag}
                            editable={!loading}
                            placeholderTextColor="rgba(0,0,0,0.5)"
                        />

                        <TouchableOpacity
                            onPress={handleAddCategory}
                            style={[styles.categoryButton]}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>Add Tag</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={globalStyles.label}>Or select from existing</Text>
                    <FlatList
                        data={allCategories.filter(cat => !selectedTags.includes(cat))}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.tagOption} onPress={() => handleAddTag(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    );
};

export default CategorySection;
