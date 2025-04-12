import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../styles/CategorySection.styles';

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
    handleAddCategory: () => void;
    loading: boolean;
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
    handleAddCategory,
    loading,
}) => (
    <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
            <View style={{ flex: 1 }}>
                <DropDownPicker
                    open={openDropdown}
                    setOpen={setOpenDropdown}
                    items={categories.map(c => ({ label: c, value: c }))}
                    value={category}
                    setValue={setCategory}
                    placeholder="Select category"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{ nestedScrollEnabled: true }}
                    zIndex={2000}
                    disabled={loading}
                />
            </View>
            <TouchableOpacity
                onPress={() => setShowCategoryInput(!showCategoryInput)}
                style={[styles.addCategoryButton, { marginLeft: 8 }]}
            >
                <Text style={styles.addCategoryButtonText}>+ Add</Text>
            </TouchableOpacity>
        </View>
        {showCategoryInput && (
            <View style={[styles.row, { marginTop: 8 }]}>
                <TextInput
                    style={[styles.input, { flex: 3 }]}
                    placeholder="Enter new category"
                    value={newCategory}
                    onChangeText={setNewCategory}
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={handleAddCategory} style={styles.roundButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
);

export default CategorySection;
