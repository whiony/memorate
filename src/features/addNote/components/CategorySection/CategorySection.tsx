import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './CategorySection.styles';
import { globalStyles } from '@/theme/index';
import { categoryColorOptions } from '@/utils/categoryColors';

interface CategorySectionProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    categories: string[];
    openDropdown: boolean;
    setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    showCategoryInput: boolean;
    setShowCategoryInput: React.Dispatch<React.SetStateAction<boolean>>;
    newCategory: string;
    setNewCategory: React.Dispatch<React.SetStateAction<string>>;
    newCategoryColor: string;
    setNewCategoryColor: React.Dispatch<React.SetStateAction<string>>;
    handleAddCategory: () => void;
    loading: boolean;
    editableCategory?: boolean;
    style?: StyleProp<ViewStyle>;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    setCategory,
    categories,
    openDropdown,
    setOpenDropdown,
    showCategoryInput,
    setShowCategoryInput,
    newCategory,
    setNewCategory,
    newCategoryColor,
    setNewCategoryColor,
    handleAddCategory,
    loading,
    editableCategory = true,
    style
}) => (
    <View style={[styles.section, style]}>
        {editableCategory && <Text style={globalStyles.label}>Category</Text>}
        <View style={styles.categoryRow}>
            <View style={{ flex: 1 }}>
                <DropDownPicker
                    open={openDropdown}
                    setOpen={setOpenDropdown}
                    items={categories.map(c => ({ label: c, value: c }))}
                    value={category}
                    setValue={setCategory}
                    placeholder="Select category"
                    style={[globalStyles.standartDropdown, !editableCategory && { borderWidth: 0 }]}
                    dropDownContainerStyle={[globalStyles.standartDropdownContainer, !editableCategory && { borderWidth: 1, borderColor: '#e2e2e2' }]}
                    textStyle={globalStyles.standartDropdownText}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{ nestedScrollEnabled: true }}
                    zIndex={2000}
                    disabled={loading}
                />
            </View>
            {editableCategory && (
                <TouchableOpacity
                    onPress={() => setShowCategoryInput(!showCategoryInput)}
                    style={[styles.categoryButton, globalStyles.standartButton]}
                >
                    <Text style={styles.addCategoryButtonText}>+ Add</Text>
                </TouchableOpacity>
            )}
        </View>

        {showCategoryInput && (
            <View>
                <View style={styles.colorPickerContainer}>
                    {categoryColorOptions.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorOption,
                                { backgroundColor: color },
                                newCategoryColor === color && styles.selectedColorOption
                            ]}
                            onPress={() => setNewCategoryColor(color)}
                        />
                    ))}
                </View>
                <View style={[styles.categoryRow, { marginTop: 8 }]}>
                    <TextInput
                        style={[globalStyles.standartInput, { flex: 3 }]}
                        placeholder="Enter new category"
                        value={newCategory}
                        onChangeText={setNewCategory}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        onPress={handleAddCategory}
                        style={[styles.categoryButton, globalStyles.standartButton]}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
    </View>
);

export default CategorySection;
